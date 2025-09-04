// src/utils/loadData.ts
import { fetchBlogData } from "./fetchData";
import type { Section, Post, Author } from "@packages/types/web/blog";

export async function loadData(): Promise<{
    sections: Section[];
    posts: Post[];
    authors: Author[];
}> {
    return await fetchBlogData();
}
