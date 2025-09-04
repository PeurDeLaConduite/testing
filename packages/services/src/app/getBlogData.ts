import { fetchBlogData } from "@services/adapters/blog/fetchBlogData";
import type { BlogData } from "@packages/types/web/blog";

export async function getBlogData(): Promise<BlogData> {
    const data = await fetchBlogData();
    return {
        sections: data.sections ?? [],
        posts: data.posts ?? [],
        authors: data.authors ?? [],
    };
}
