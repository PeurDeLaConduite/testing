import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePostForm } from "@packages/ui/models/post/hooks";
import { type PostType } from "models/post/types";
import { postService } from "@packages/services/app/models/post/service";
import { syncPostToTags } from "@packages/domain/relations/postTag";
import { syncPostToSections } from "@packages/domain/relations/sectionPost";

vi.mock("@packages/services/app/models/post/service", () => ({
    postService: {
        create: vi.fn().mockResolvedValue({ data: { id: "post1" } }),
        update: vi.fn().mockResolvedValue({ data: { id: "post1" } }),
        list: vi.fn().mockResolvedValue({ data: [] }),
    },
}));

vi.mock("@packages/domain/relations/postTag", () => ({
    syncPostToTags: vi.fn(),
    postTagService: { listByParent: vi.fn().mockResolvedValue([]) },
}));

vi.mock("@packages/domain/relations/sectionPost", () => ({
    syncPostToSections: vi.fn(),
    sectionPostService: { listByChild: vi.fn().mockResolvedValue([]) },
}));

vi.mock("@packages/services/app/models/author/service", () => ({
    authorService: { list: vi.fn().mockResolvedValue({ data: [] }) },
}));

vi.mock("@packages/services/app/models/tag/service", () => ({
    tagService: { list: vi.fn().mockResolvedValue({ data: [] }) },
}));

vi.mock("@packages/services/app/models/section/service", () => ({
    sectionService: { list: vi.fn().mockResolvedValue({ data: [] }) },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("usePostForm", () => {
    it("gère la création, les toggles et le reset", async () => {
        const { result } = renderHook(() => usePostForm(null));

        act(() => {
            result.current.setFieldValue("title", "Titre");
            result.current.setFieldValue("authorId", "a1");
            result.current.toggleTag("tag1");
            result.current.toggleSection("section1");
        });

        await act(async () => {
            await result.current.submit();
        });

        expect(postService.create).toHaveBeenCalled();
        expect(result.current.form.tagIds).toEqual(["tag1"]);
        expect(result.current.form.sectionIds).toEqual(["section1"]);
        expect(result.current.mode).toBe("edit");

        act(() => {
            result.current.setFieldValue("title", "Nouveau");
            result.current.reset();
        });
        expect(result.current.form.title).toBe("Titre");
        expect(result.current.form.tagIds).toEqual(["tag1"]);
    });

    it("synchronise les tags et sections", async () => {
        const post: PostType = { id: "post1", authorId: "a1", seo: {} };
        const { result } = renderHook(() => usePostForm(post));

        act(() => {
            result.current.setForm({
                ...result.current.form,
                authorId: "a1",
                tagIds: ["tag1"],
                sectionIds: ["section1"],
            });
        });

        act(() => {
            result.current.toggleTag("tag1");
            result.current.toggleTag("tag2");
            result.current.toggleSection("section1");
            result.current.toggleSection("section2");
        });

        await act(async () => {
            await result.current.submit();
        });

        expect(syncPostToTags).toHaveBeenCalledWith("post1", ["tag2"]);
        expect(syncPostToSections).toHaveBeenCalledWith("post1", ["section2"]);
    });
});
