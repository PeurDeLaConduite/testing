// src/utils/loadData.ts
import { getBlogData } from "@packages/services/app/getBlogData";
import type { Section, Post, Author } from "@packages/types/web/blog";

export async function loadData(): Promise<{
    sections: Section[];
    posts: Post[];
    authors: Author[];
}> {
    return await getBlogData();
}
