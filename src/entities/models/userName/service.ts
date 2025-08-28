// src/entities/models/userName/service.ts
import { crudService } from "@entities/core";
import type { UserNameTypeCreateInput, UserNameTypeUpdateInput } from "@entities/models/userName/types";

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
