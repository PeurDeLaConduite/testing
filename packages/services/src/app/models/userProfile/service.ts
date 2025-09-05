// src/entities/models/userProfile/service.ts
import { crudService } from "@packages/services/adapters/core/crudService";
import type {
    UserProfileTypeOmit,
    UserProfileTypeUpdateInput,
} from "@packages/types/models/userProfile/types";

export const userProfileService = crudService<
    "UserProfile",
    UserProfileTypeOmit & { id: string },
    UserProfileTypeUpdateInput & { id: string },
    { id: string },
    { id: string }
>("UserProfile", {
    auth: { read: "userPool", write: "userPool" },
});
