import { crudService } from "@services/adapters/core/crudService";
import { setNullBatch } from "@services/app/core/cascade";
import { postService } from "@services/app/models/post/service";
import type {
    AuthorTypeOmit,
    AuthorTypeUpdateInput,
} from "@types/models/author/types";

const base = crudService<
    "Author",
    Omit<AuthorTypeOmit, "posts">,
    AuthorTypeUpdateInput & { id: string },
    { id: string },
    { id: string }
>("Author", {
    auth: { read: ["apiKey", "userPool"], write: "userPool" },
});

export const authorService = {
    ...base,
    async deleteCascade({ id }: { id: string }) {
        await setNullBatch(
            postService.list,
            async (p) => {
                await postService.update(p as AuthorTypeUpdateInput & { id: string });
            },
            "authorId",
            id
        );
        return base.delete({ id });
    },
};
