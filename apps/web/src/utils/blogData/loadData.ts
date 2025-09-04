// src/utils/loadData.ts
import { fetchBlogData } from "./fetchData";
import type { Section, Post, Author } from "@types/blog";

export async function loadData(): Promise<{
    sections: Section[];
    posts: Post[];
    authors: Author[];
}> {
    return await fetchBlogData();
}
