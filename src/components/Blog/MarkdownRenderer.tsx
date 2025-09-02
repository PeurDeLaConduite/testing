// src/components/Blog/MarkdownRenderer.tsx
"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type MarkdownRendererProps = {
    children: string;
    className?: string; // pour ajuster le conteneur
    paragraphClassName?: string; // pour mapper les <p>
};

export default function MarkdownRenderer({
    children,
    className = "prose mx-auto markdown-container",
    paragraphClassName = "info-message",
}: MarkdownRendererProps) {
    const sanitizeConfig = {
        ...defaultSchema,
        attributes: {
            ...(defaultSchema as any).attributes,
            a: [...((defaultSchema as any).attributes?.a || []), "href", "title", "target", "rel"],
        },
    };

    return (
        <div className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeSanitize, sanitizeConfig]]}
                components={{
                    p: ({ node, ...props }) => <p className={paragraphClassName} {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-2" {...props} />,
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-6 my-2" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                        <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="underline"
                        />
                    ),
                    strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                    em: ({ node, ...props }) => <em className="italic" {...props} />,
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}
