import { toUserProfileForm } from "@domain/models/userProfile/form";
import { type UserProfileTypeUpdateInput } from "@types/models/userProfile/types";

const labels: Partial<Record<keyof UserProfileTypeUpdateInput, string>> = {
    firstName: "Prénom",
    familyName: "Nom",
    address: "Adresse",
    postalCode: "Code postal",
    city: "Ville",
    country: "Pays",
    phoneNumber: "Téléphone",
};

export const label = (field: keyof UserProfileTypeUpdateInput): string => labels[field] ?? field;

export const fields = Object.keys(labels) as string[];

export const normalizeFormData = toUserProfileForm;
