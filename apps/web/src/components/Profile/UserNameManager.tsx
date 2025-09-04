// src/components/Profile/UserNameManager.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import EntityEditor from "@components/forms/EntityEditor";
import { label as fieldLabel } from "./utilsUserName";
import PersonIcon from "@mui/icons-material/Person";
import { useUserNameForm } from "@ui/models/userName/hooks";
import { onUserNameUpdated } from "@domain/models/userName/bus";
import {
    type UserNameFormType,
    type UserNameType,
    initialUserNameForm,
} from "@domain/models/userName";

// ⚠️ importe ton JSON i18n réel (ex. le fichier que tu as préparé)
import type { Messages } from "@src/i18n/types";
import messagesJson from "@src/i18n/fr/usernameModal.json";

type IdLike = string | number;
const fields: (keyof UserNameFormType)[] = ["userName"];
const fieldAutoComplete: Partial<Record<keyof UserNameFormType, string>> = {
    userName: "username",
};
const messages: Messages = messagesJson as Messages;
const t = (path: string): unknown =>
    path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object") {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, messages as unknown);

interface UserNameManagerProps {
    inputId?: string;
    label?: string;
    placeholder?: string;
    ariaDescribedBy?: string;
    submitLabel?: string;
    submitAriaLabel?: string;
    secondaryLabel?: string;
    onSecondaryClick?: () => void;
}

export default function UserNameManager(props: UserNameManagerProps) {
    void props;
    const { user } = useAuthenticator();
    const [userNameToEdit, setUserNameToEdit] = useState<UserNameType | null>(null);
    const [userNameId, setUserNameId] = useState<string | null>(null);

    const manager = useUserNameForm(userNameToEdit);
    const { deleteEntity, setForm, setMode, refresh } = manager;

    useEffect(() => {
        if (user) void refresh();
    }, [user, refresh]);

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

    // i18n/ARIA pour le champ + bouton
    const fieldId = "userName-input"; // DOIT matcher le focus du modal
    const placeholder = t("usernameModal.common.placeholder") as string;
    const ariaDescribedBy = t("usernameModal.common.aria.inputDescribedBy") as string;
    const submitAria = t("usernameModal.common.aria.submitAria") as string;
    const primaryCta = t("usernameModal.common.primaryCta") as string;

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
            fieldAutoComplete={fieldAutoComplete}
            labels={fieldLabel as (field: keyof UserNameFormType) => string}
            updateEntity={manager.updateEntity}
            clearField={manager.clearField}
            deleteEntity={async (id?: string) => {
                const target = id ?? userNameId ?? user?.userId ?? user?.username ?? undefined;
                if (!target) return;
                await handleDeleteById(target);
            }}
            // ✅ NOUVEAU : props pour input et bouton
            fieldPropsByKey={{
                userName: {
                    id: fieldId,
                    placeholder,
                    "aria-describedby": ariaDescribedBy,
                    autoComplete: "nickname",
                },
            }}
            submitButtonProps={{
                "aria-label": submitAria,
                children: primaryCta,
            }}
        />
    );
}
