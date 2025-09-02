"use client";
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { Post, Author } from "@/src/types/blog";

type Props = {
    posts: Post[];
    authors: Author[];
};

function BlogList({ posts, authors }: Props) {
    const [hovered, setHovered] = useState<string | null>(null);
    return (
        <div className="blog-list">
            {posts.map((post) => {
                const author = authors.find((a) => a.id === post.authorId)!;
                return (
                    <BlogCard
                        key={post.id}
                        post={post}
                        author={author}
                        hovered={hovered === post.id}
                        faded={hovered !== null && hovered !== post.id}
                        onHover={() => setHovered(post.id)}
                        onUnhover={() => setHovered(null)}
                        onFocus={() => setHovered(post.id)}
                        onBlur={() => setHovered(null)}
                    />
                );
            })}
        </div>
    );
}
export default React.memo(BlogList);
