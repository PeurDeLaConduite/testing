import { crudService, deleteEdges } from "@domain/core";
import { sectionPostService } from "@domain/relations/sectionPost/service";
import type { SectionTypeOmit, SectionTypeUpdateInput } from "@domain/models/section/types";

const base = crudService<
    "Section",
    Omit<SectionTypeOmit, "posts">,
    SectionTypeUpdateInput & { id: string },
    { id: string },
    { id: string }
>("Section", {
    auth: { read: ["apiKey", "userPool"], write: "userPool" },
});

export const sectionService = {
    ...base,
    async deleteCascade({ id }: { id: string }) {
        await deleteEdges(
            sectionPostService.list,
            async (edge) => {
                await sectionPostService.delete(edge.sectionId, edge.postId);
            },
            "sectionId",
            id
        );
        return base.delete({ id });
    },
};
