// src/entities/core/services/crudService.ts
import { client, Schema } from "./amplifyClient";
import { canAccess } from "../auth";
import type { AuthRule } from "../types";

// 🧠 Utiliser les signatures réelles du client Amplify
type ClientModels = typeof client.models;
type ClientModelKey = keyof ClientModels;

type BaseModel<K extends ClientModelKey> = Schema[K]["type"];
// @ts-expect-error no explain
type CreateArg<K extends ClientModelKey> = Parameters<ClientModels[K]["create"]>[0];
// @ts-expect-error no explain
type UpdateArg<K extends ClientModelKey> = Parameters<ClientModels[K]["update"]>[0];
// @ts-expect-error no explain
type GetArg<K extends ClientModelKey> = Parameters<ClientModels[K]["get"]>[0];
// @ts-expect-error no explain
type DeleteArg<K extends ClientModelKey> = Parameters<ClientModels[K]["delete"]>[0];

export type AuthMode = "apiKey" | "userPool" | "identityPool" | "iam" | "lambda";
type CrudAuth = { read?: AuthMode | AuthMode[]; write?: AuthMode | AuthMode[] };
type AmplifyOpOptions = { authMode?: AuthMode } & Record<string, unknown>;

interface CrudModel<K extends ClientModelKey> {
    list: (opts?: AmplifyOpOptions) => Promise<{ data: BaseModel<K>[] }>;
    get: (args: GetArg<K>, opts?: AmplifyOpOptions) => Promise<{ data?: BaseModel<K> }>;
    create: (
        data: CreateArg<K>,
        opts?: AmplifyOpOptions
    ) => Promise<{ data: BaseModel<K>; errors?: { message: string }[] }>;
    update: (
        data: UpdateArg<K>,
        opts?: AmplifyOpOptions
    ) => Promise<{ data: BaseModel<K>; errors?: { message: string }[] }>;
    delete: (
        args: DeleteArg<K>,
        opts?: AmplifyOpOptions
    ) => Promise<{ data: BaseModel<K>; errors?: { message: string }[] }>;
}

function getModelClient<K extends ClientModelKey>(key: K): CrudModel<K> {
    return client.models[key] as unknown as CrudModel<K>;
}

function toArray<T>(v?: T | T[]): T[] {
    return v === undefined ? [] : Array.isArray(v) ? v : [v];
}

async function tryModes<T>(
    modes: (AuthMode | undefined)[],
    runner: (mode?: AuthMode) => Promise<T>
): Promise<T> {
    let lastErr: unknown;
    for (const m of modes.length ? modes : [undefined]) {
        try {
            return await runner(m);
        } catch (e) {
            lastErr = e;
        }
    }
    throw lastErr;
}

export function crudService<K extends ClientModelKey>(
    key: K,
    opts?: { auth?: CrudAuth; rules?: AuthRule[] }
) {
    const model = getModelClient(key);
    const rules = opts?.rules ?? [{ allow: "public" }];
    const readModes = toArray(opts?.auth?.read);
    const writeModes = toArray(opts?.auth?.write);

    return {
        async list(params?: Record<string, unknown>) {
            const { data } = await tryModes(readModes, (authMode) =>
                model.list({
                    ...(params ?? {}),
                    ...(authMode ? { authMode } : {}),
                } as AmplifyOpOptions)
            );
            return { data: data.filter((item) => canAccess(null, item, rules)) };
        },

        async get(args: GetArg<K>) {
            const res = await tryModes(readModes, (authMode) =>
                model.get(
                    args,
                    (authMode ? { authMode } : undefined) as AmplifyOpOptions | undefined
                )
            );
            if (res.data && !canAccess(null, res.data, rules)) return { data: undefined };
            return res;
        },

        async create(data: CreateArg<K>) {
            return tryModes(writeModes, (authMode) =>
                model.create(
                    data,
                    (authMode ? { authMode } : undefined) as AmplifyOpOptions | undefined
                )
            );
        },

        async update(data: UpdateArg<K>) {
            return tryModes(writeModes, (authMode) =>
                model.update(
                    data,
                    (authMode ? { authMode } : undefined) as AmplifyOpOptions | undefined
                )
            );
        },

        async delete(args: DeleteArg<K>) {
            return tryModes(writeModes, (authMode) =>
                model.delete(
                    args,
                    (authMode ? { authMode } : undefined) as AmplifyOpOptions | undefined
                )
            );
        },
    };
}
