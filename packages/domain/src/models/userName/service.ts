// src/entities/models/userName/service.ts
import { crudService } from "@domain/core";
import type {
    UserNameTypeCreateInput,
    UserNameTypeUpdateInput,
} from "@domain/models/userName/types";

// ✅ Lecture en public (API key), écritures avec User Pool
export const userNameService = crudService<
    "UserName",
    UserNameTypeCreateInput & { id: string },
    UserNameTypeUpdateInput & { id: string },
    { id: string },
    { id: string }
>("UserName", {
    auth: { read: "apiKey", write: "userPool" },
});
