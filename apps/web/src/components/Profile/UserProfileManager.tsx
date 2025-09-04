"use client";

import React, { useState, useCallback } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import EntityEditor from "@components/forms/EntityEditor";
import { label as fieldLabel } from "@ui/models/userProfile/utilsUserProfile";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useUserProfileForm } from "@ui/models/userProfile/hooks";
import {
    type UserProfileFormType,
    type UserProfileType,
    type UserProfileTypeUpdateInput,
    initialUserProfileForm,
} from "@domain/models/userProfile";

type IdLike = string | number;

const fields: (keyof UserProfileFormType)[] = [
    "firstName",
    "familyName",
    "phoneNumber",
    "address",
    "postalCode",
    "city",
    "country",
];

export default function UserProfileManager() {
    const { user } = useAuthenticator();
    const [profileToEdit, setProfileToEdit] = useState<UserProfileType | null>(null);
    const [profileId, setProfileId] = useState<string | null>(null);

    // ✅ même signature que les autres managers (ex: useAuthorForm)
    const manager = useUserProfileForm(profileToEdit);
    const { deleteEntity, setForm, setMode, form } = manager;

    const handleDeleteById = useCallback(
        async (id: IdLike) => {
            await deleteEntity(String(id));
            setProfileToEdit(null);
            setProfileId(null);
            setMode("create");
            setForm(initialUserProfileForm);
        },
        [deleteEntity, setMode, setForm]
    );

    if (!user) return null;

    const getIcon = (field: keyof UserProfileFormType) => {
        switch (field) {
            case "phoneNumber":
                return <PhoneIcon fontSize="small" className="user-profile-icon" />;
            case "firstName":
            case "familyName":
                return <PersonIcon fontSize="small" className="user-profile-icon" />;
            case "address":
            case "postalCode":
            case "city":
            case "country":
                return <HomeIcon fontSize="small" className="user-profile-icon" />;
            default:
                return null;
        }
    };

    function formatPhoneNumber(number?: string): string {
        if (!number) return "";
        return number.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    }

    const renderProfileField = (field: keyof UserProfileFormType, value: string) => {
        if (field === "phoneNumber") {
            return value ? (
                <p className="user-profile-value">{formatPhoneNumber(value)}</p>
            ) : (
                <p className="user-profile-placeholder">Numéro non renseigné</p>
            );
        }
        return value ? (
            <p className="user-profile-value">{value}</p>
        ) : (
            <p className="user-profile-placeholder">Information non disponible</p>
        );
    };

    return (
        <EntityEditor<UserProfileFormType>
            title="Mon profil"
            requiredFields={["firstName", "familyName"]}
            labelIcon={getIcon}
            renderValue={renderProfileField}
            deleteLabel="Supprimer le profil"
            onClearField={(field, clear) => {
                if (confirm(`Supprimer le contenu du champ "${fieldLabel(field)}" ?`)) {
                    void clear(field);
                }
            }}
            form={form}
            mode={manager.mode}
            dirty={manager.dirty}
            setFieldValue={
                manager.setFieldValue as (field: keyof UserProfileFormType, value: unknown) => void
            }
            submit={manager.submit}
            reset={manager.reset}
            setForm={manager.setForm}
            fields={fields}
            labels={(f) => fieldLabel(f as keyof UserProfileTypeUpdateInput)}
            updateEntity={manager.updateEntity}
            clearField={manager.clearField}
            // Wrapper “à la AuthorList.onDeleteById”
            deleteEntity={async (id?: string) => {
                const target = id ?? profileId ?? user?.userId ?? user?.username ?? undefined;
                if (!target) return;
                await handleDeleteById(target);
            }}
        />
    );
}
