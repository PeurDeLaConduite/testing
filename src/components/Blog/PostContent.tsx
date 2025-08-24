// src/components/Blog/PostContent.tsx
import React from "react";
import VideoEmbed from "./VideoEmbed";
import { Post, Author } from "@src/types/blog";
import MarkdownRenderer from "./MarkdownRenderer";
import AuthorSignature from "./AuthorSignature";
interface PostContentProps {
    post: Post & { content: string }; // Markdown content
    author: Author;
}

const PostContent: React.FC<PostContentProps> = ({ post, author }) => (
    <article className="post-content">
        <div className="post-content__title">
            <h2>{post.title}</h2>
        </div>
        <div className="post-content__post">
            <div className="float-img">
                {post.videoUrl && (
                    <div className="post-content__video">
                        <VideoEmbed
                            url={post.videoUrl}
                            title={`Vidéo de ${post.title}`}
                        />
                    </div>
                )}
            </div>
            <div className="post-content__content">
                <MarkdownRenderer>{post.content}</MarkdownRenderer>
            </div>

            <AuthorSignature author={author} date={post.createdAt} />
        </div>
    </article>
);

export default PostContent;
