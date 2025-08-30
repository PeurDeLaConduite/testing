// src/components/Profile/UserNameManager.tsx  (← même code que chez toi, juste nettoyé)
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

type IdLike = string | number;
const fields: (keyof UserNameFormType)[] = ["userName"];

export default function UserNameManager() {
    // Ici on peut garder user si tu en as besoin pour l'id par défaut, mais on n’en déduit plus la redirection
    const { user } = useAuthenticator();
    const [userNameToEdit, setUserNameToEdit] = useState<UserNameType | null>(null);
    const [userNameId, setUserNameId] = useState<string | null>(null);

    const manager = useUserNameForm(userNameToEdit);
    const { deleteEntity, setForm, setMode, refresh } = manager;

    // Charger/rafraîchir quand l’utilisateur est présent
    useEffect(() => {
        if (user) void refresh();
    }, [user, refresh]);

    // Resync si MAJ ailleurs
    useEffect(() => {
        const unsub = onUserNameUpdated(() => {
            void refresh();
        });
        return unsub;
    }, [refresh]);

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
