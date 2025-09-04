import { toUserNameForm } from "@domain/models/userName/form";
import { type UserNameTypeUpdateInput } from "@domain/models/userName/types";

export const label = (field: keyof UserNameTypeUpdateInput): string => {
    switch (field) {
        case "userName":
            return "Pseudo public";
        default:
            return field;
    }
};

export const normalizeFormData = toUserNameForm;
