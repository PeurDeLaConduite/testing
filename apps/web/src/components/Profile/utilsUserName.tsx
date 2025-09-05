import { toUserNameForm } from "@packages/domain/models/userName/form";
import { type UserNameTypeUpdateInput } from "@packages/types/models/userName/types";

const labels: Partial<Record<keyof UserNameTypeUpdateInput, string>> = {
    userName: "Pseudo public",
};

export const label = (field: keyof UserNameTypeUpdateInput): string => labels[field] ?? field;

export const fields = Object.keys(labels) as string[];

export const normalizeFormData = toUserNameForm;
