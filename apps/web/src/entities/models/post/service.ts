import { crudService, deleteEdges } from "@entities/core";
import { commentService } from "@entities/models/comment/service";
import { postTagService } from "@entities/relations/postTag/service";
import { sectionPostService } from "@entities/relations/sectionPost/service";
import type { PostTypeOmit, PostTypeUpdateInput } from "@entities/models/post/types";

const base = crudService<
    "Post",
    Omit<PostTypeOmit, "comments" | "author" | "sections" | "tags">,
    PostTypeUpdateInput & { id: string },
    { id: string },
    { id: string }
>("Post", {
    auth: { read: ["apiKey", "userPool"], write: "userPool" },
});

export const postService = {
    ...base,
    async deleteCascade({ id }: { id: string }) {
        await deleteEdges(
            commentService.list,
            async (c) => {
                await commentService.delete({ id: c.id });
            },
            "postId",
            id
        );

        await deleteEdges(
            postTagService.list,
            async (edge) => {
                await postTagService.delete(edge.postId, edge.tagId);
            },
            "postId",
            id
        );

        await deleteEdges(
            sectionPostService.list,
            async (edge) => {
                await sectionPostService.delete(edge.sectionId, edge.postId);
            },
            "postId",
            id
        );

        return base.delete({ id });
    },
};
