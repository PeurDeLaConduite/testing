import { canAccess, type AuthRule } from "@domain/core";
import { authorService } from "@domain/models/author/service";
import { sectionService } from "@domain/models/section/service";
import { postService } from "@domain/models/post/service";
import { tagService } from "@domain/models/tag/service";
import { postTagService } from "@domain/relations/postTag/service";
import { sectionPostService } from "@domain/relations/sectionPost/service";

import type { BlogData, Author, Post, Section } from "@types/blog";

export async function fetchBlogData(): Promise<BlogData> {
    try {
        const [authorsRes, sectionsRes, postsRes, tagsRes, postTagsRes, sectionPostsRes] =
            await Promise.all([
                authorService.list({ authMode: "apiKey" }),
                sectionService.list({ authMode: "apiKey" }),
                postService.list({ authMode: "apiKey" }),
                tagService.list({ authMode: "apiKey" }),
                postTagService.list({ authMode: "apiKey" }),
                sectionPostService.list({ authMode: "apiKey" }),
            ]);

        const publicRule: AuthRule[] = [{ allow: "public" }];

        const authorData = authorsRes.data.filter((a) => canAccess(null, a, publicRule));
        const sectionData = sectionsRes.data.filter((s) => canAccess(null, s, publicRule));
        const postData = postsRes.data.filter((p) => canAccess(null, p, publicRule));

        const tagsById: Record<string, string> = {};
        tagsRes.data.forEach((t) => {
            tagsById[t.id] = t.name;
        });

        const posts: Post[] = postData.map((p) => ({
            id: p.id,
            title: p.title ?? "",
            slug: p.slug ?? "",
            excerpt: p.excerpt ?? "",
            content: p.content ?? "",
            authorId: p.authorId,
            sectionIds: [],
            relatedPostIds: [],
            videoUrl: p.videoUrl ?? null,
            tags: [],
            type: p.type ?? "",
            status: p.status ?? "",
            seo: {
                title: p.seo?.title ?? "",
                description: p.seo?.description ?? "",
                image: p.seo?.image ?? null,
            },
            createdAt: p.createdAt ?? "",
            updatedAt: p.updatedAt ?? "",
        }));

        const postsById: Record<string, Post> = {};
        posts.forEach((p) => {
            postsById[p.id] = p;
        });

        const sections: Section[] = sectionData.map((s) => ({
            id: s.id,
            title: s.title ?? "",
            slug: s.slug ?? "",
            description: s.description ?? "",
            order: s.order ?? 0,
            postIds: [],
            seo: s.seo
                ? {
                      title: s.seo.title ?? "",
                      description: s.seo.description ?? "",
                      image: s.seo.image || undefined,
                  }
                : undefined,
        }));

        const sectionsById: Record<string, Section> = {};
        sections.forEach((s) => {
            sectionsById[s.id] = s;
        });

        // Map SectionPost relationships
        sectionPostsRes.data.forEach((sp) => {
            const post = postsById[sp.postId];
            if (post) {
                post.sectionIds.push(sp.sectionId);
            }
            const section = sectionsById[sp.sectionId];
            if (section) {
                section.postIds.push(sp.postId);
            }
        });

        // Map PostTag relationships
        postTagsRes.data.forEach((pt) => {
            const post = postsById[pt.postId];
            const tagName = tagsById[pt.tagId];
            if (post && tagName) {
                post.tags.push(tagName);
            }
        });

        const authors: Author[] = authorData.map((a) => ({
            id: a.id,
            name: a.authorName ?? "",
            avatar: a.avatar ?? "",
        }));

        return { sections, posts, authors };
    } catch (error) {
        throw new Error(`Failed to fetch blog data: ${(error as Error).message}`);
    }
}
