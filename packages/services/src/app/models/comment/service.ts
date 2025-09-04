import { client } from "@services/adapters/core/amplifyClient";
import { crudService } from "@services/adapters/core/crudService";
import type {
    CommentCreateInput,
    CommentUpdateInput,
} from "@types/models/comment/types";

export const commentService = crudService<
    "Comment",
    CommentCreateInput,
    CommentUpdateInput & { id: string },
    { id: string },
    { id: string }
>("Comment", {
    auth: { read: ["apiKey", "userPool"], write: "userPool" },
});

export function useCommentService() {
    return client.models.Comment;
}
