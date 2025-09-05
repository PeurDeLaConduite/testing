import { client } from "@packages/services/adapters/core/amplifyClient";
import { crudService } from "@packages/services/adapters/core/crudService";
import type { TodoCreateInput, TodoUpdateInput } from "@packages/types/models/todo/types";

export const todoService = crudService<
    "Todo",
    TodoCreateInput,
    TodoUpdateInput & { id: string },
    { id: string },
    { id: string }
>("Todo", {
    auth: { read: ["apiKey", "userPool"], write: "userPool" },
});

export function useTodoService() {
    return client.models.Todo;
}
