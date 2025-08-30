// src/app/profile/UserNameManager.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import EntityEditor from "@components/forms/EntityEditor";
import { label as fieldLabel } from "./utilsUserName";
import PersonIcon from "@mui/icons-material/Person";
import { useUserNameForm } from "@entities/models/userName/hooks";
import { onUserNameUpdated } from "@entities/models/userName/bus";
import {
    type UserNameFormType,
    type UserNameType,
    initialUserNameForm,
} from "@entities/models/userName";
import { useRouter, usePathname } from "next/navigation";

type IdLike = string | number;
const fields: (keyof UserNameFormType)[] = ["userName"];

export default function UserNameManager() {
    // ⚡ Utiliser authStatus pour connaître l’état d’authentification
    const { authStatus, user } = useAuthenticator((ctx) => [ctx.authStatus, ctx.user]);

    const router = useRouter();
    const pathname = usePathname();

    const [userNameToEdit, setUserNameToEdit] = useState<UserNameType | null>(null);
    const [userNameId, setUserNameId] = useState<string | null>(null);

    const manager = useUserNameForm(userNameToEdit);
    const { deleteEntity, setForm, setMode, refresh } = manager;

    // 🔁 Rediriger vers /connexion si non connecté
    useEffect(() => {
        if (authStatus === "unauthenticated") {
            // Option : préserver la page de retour
            const redirect = encodeURIComponent(pathname ?? "/profile");
            router.replace(`/connexion?redirect=${redirect}`);
        }
    }, [authStatus, router, pathname]);

    // 🔄 Charger/rafraîchir quand l’utilisateur est connecté
    useEffect(() => {
        if (authStatus === "authenticated" && user) void refresh();
    }, [authStatus, user, refresh]);

    // 🔔 Se resynchroniser si un autre écran met à jour le pseudo
    useEffect(() => {
        if (authStatus !== "authenticated") return;
        const unsub = onUserNameUpdated(() => {
            void refresh();
        });
        return unsub;
    }, [authStatus, refresh]);

    const handleDeleteById = useCallback(
        async (id: IdLike) => {
            await deleteEntity(String(id));
            setUserNameToEdit(null);
            setUserNameId(null);
            setMode("create");
            setForm(initialUserNameForm);
        },
        [deleteEntity, setMode, setForm]
    );

    // ⏳ Pendant la résolution de la session Amplify, on ne rend rien (ou un loader si tu préfères)
    if (authStatus !== "authenticated") return null;

    return (
        <EntityEditor<UserNameFormType>
            title="Mon pseudo public"
            requiredFields={["userName"]}
            deleteLabel="Supprimer le pseudo"
            labelIcon={() => <PersonIcon fontSize="small" className="user-name-manager_icon" />}
            onClearField={(field, clear) => {
                if (confirm(`Supprimer le contenu du champ "Pseudo public" ?`)) {
                    void clear(field);
                }
            }}
            form={manager.form}
            mode={manager.mode}
            dirty={manager.dirty}
            setFieldValue={
                manager.setFieldValue as (field: keyof UserNameFormType, value: unknown) => void
            }
            submit={manager.submit}
            reset={manager.reset}
            setForm={manager.setForm}
            fields={fields}
            labels={fieldLabel as (field: keyof UserNameFormType) => string}
            updateEntity={manager.updateEntity}
            clearField={manager.clearField}
            deleteEntity={async (id?: string) => {
                const target = id ?? userNameId ?? user?.userId ?? user?.username ?? undefined;
                if (!target) return;
                await handleDeleteById(target);
            }}
        />
    );
}
