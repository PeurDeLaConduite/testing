"use client";
import { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
import EntityEditor from "@components/forms/EntityEditor";
import { label as fieldLabel } from "./utilsUserProfile";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useUserProfileForm } from "@entities/models/userProfile/hooks";
import { type UserProfileMinimalType } from "@entities/models/userProfile/types";
// import "./_UserProfileManager.scss";

export default function UserProfileManager() {
    const { user } = useAuthenticator();
    const profile = useUserProfileForm();

    const getIcon = (field: keyof UserProfileMinimalType) => {
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

    const renderValue = (field: keyof UserProfileMinimalType, value: string) => {
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
    useEffect(() => {
        if (user) {
            void profile.fetchProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (!user) return null;

    return (
        <EntityEditor<UserProfileMinimalType>
            title="Mon profil"
            titleHeading="Informations personnelles"
            requiredFields={["firstName", "familyName"]}
            renderIcon={getIcon}
            renderValue={renderValue}
            deleteLabel="Supprimer le profil"
            onClearField={(field, clear) => {
                if (confirm(`Supprimer le contenu du champ "${fieldLabel(field)}" ?`)) {
                    void clear(field);
                }
            }}
            form={profile.form}
            mode={profile.mode}
            dirty={profile.dirty}
            handleChange={
                profile.handleChange as (
                    field: keyof UserProfileMinimalType,
                    value: unknown
                ) => void
            }
            submit={profile.submit}
            reset={profile.reset}
            setForm={profile.setForm}
            fields={profile.fields}
            labels={profile.labels}
            saveField={profile.saveField}
            clearField={profile.clearField}
            deleteEntity={profile.deleteProfile}
        />
    );
}
