// src/entities/models/userName/hooks.tsx
import { useCallback, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useModelForm } from "@entities/core/hooks";
import { userNameService } from "@entities/models/userName/service";
import {
    initialUserNameForm,
    toUserNameForm,
    toUserNameCreate,
    toUserNameUpdate,
} from "@entities/models/userName/form";
import { type UserNameFormType } from "@entities/models/userName/types";

export function useUserNameForm() {
    const { user } = useAuthenticator();
    const sub = user?.userId ?? user?.username;

    const modelForm = useModelForm<UserNameFormType>({
        initialForm: initialUserNameForm,
        // 🔄 Charge la vérité serveur (ou null si inexistant)
        load: async () => {
            if (!sub) return null;
            const { data } = await userNameService.get({ id: sub });
            if (!data) return null;
            return toUserNameForm(data, [], []);
        },
        create: async (form) => {
            if (!sub) throw new Error("id manquant");
            const { data, errors } = await userNameService.create({
                id: sub,
                ...toUserNameCreate(form),
            } as unknown as Parameters<typeof userNameService.create>[0]);
            if (!data) throw new Error(errors?.[0]?.message ?? "Erreur création pseudo");
            return data.id;
        },
        update: async (form) => {
            if (!sub) throw new Error("id manquant");
            const { data, errors } = await userNameService.update({
                id: sub,
                ...toUserNameUpdate(form),
            });
            if (!data) throw new Error(errors?.[0]?.message ?? "Erreur mise à jour pseudo");
            return data.id;
        },
    });

    const { adoptInitial, setMessage, setForm, refresh, submit } = modelForm;

    // Au montage (ou changement d'utilisateur), on essaie de charger l'état
    useEffect(() => {
        if (!sub) return;
        (async () => {
            const form = await (async () => {
                const { data } = await userNameService.get({ id: sub });
                return data ? toUserNameForm(data, [], []) : null;
            })();
            if (form) adoptInitial(form, "edit");
            else adoptInitial(initialUserNameForm, "create");
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sub]);

    // On wrap submit pour s'assurer du refresh après l'opération
    const submitAndRefresh = useCallback(async () => {
        await submit();
        await refresh();
    }, [submit, refresh]);

    const saveField = async (field: keyof UserNameFormType, value: string): Promise<void> => {
        if (!sub) return;
        try {
            setMessage(null);
            const { errors } = await userNameService.update({ id: sub, [field]: value } as never);
            if (errors?.length) throw new Error(errors[0].message);
            // Optimiste + re-fetch pour la vérité serveur
            setForm((f) => ({ ...f, [field]: value as never }));
            await refresh();
        } catch (err) {
            setMessage(err instanceof Error ? err.message : String(err));
        }
    };

    const clearField = async (field: keyof UserNameFormType): Promise<void> => {
        await saveField(field, "");
    };

    const remove = async () => {
        if (!sub) return;
        try {
            const { errors } = await userNameService.delete({ id: sub });
            if (errors?.length) throw new Error(errors[0].message);
            adoptInitial(initialUserNameForm, "create");
            await refresh(); // par sécurité
        } catch (err) {
            setMessage(err instanceof Error ? err.message : String(err));
        }
    };

    return {
        ...modelForm,
        submit: submitAndRefresh, // ⬅️ expose la version qui refetch
        refresh,
        saveField,
        clearField,
        remove,
    };
}
