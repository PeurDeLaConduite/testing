// src/components/Blog/MarkdownRenderer.tsx
"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema, type Options as Schema } from "rehype-sanitize";

type MarkdownRendererProps = {
    children: string;
    className?: string; // pour ajuster le conteneur
    paragraphClassName?: string; // pour mapper les <p>
    target?: string;
};

// Props passés par react-markdown aux composants
type RendererProps<K extends keyof JSX.IntrinsicElements> = {
    node?: unknown;
} & React.ComponentProps<K>;

export function withClass<K extends keyof JSX.IntrinsicElements>(
    Tag: K,
    defaultProps?: Partial<React.ComponentProps<K>>
) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function Renderer({ node, ...props }: RendererProps<K>) {
        return <Tag {...defaultProps} {...props} />;
    };
}

export default function MarkdownRenderer({
    children,
    className = "prose mx-auto markdown-container",
    paragraphClassName = "info-message",
}: MarkdownRendererProps) {
    const sanitizeConfig: Schema = {
        ...defaultSchema,
        attributes: {
            ...defaultSchema.attributes,
            a: [...(defaultSchema.attributes?.a ?? []), "href", "title", "target", "rel"],
        },
    };
    return (
        <div className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeSanitize, sanitizeConfig]]}
                components={{
                    p: withClass("p", { className: paragraphClassName }),
                    ul: withClass("ul", { className: "list-disc pl-6 my-2" }),
                    ol: withClass("ol", { className: "list-decimal pl-6 my-2" }),
                    a: withClass("a", {
                        className: "underline",
                        target: "_blank",
                        rel: "noopener noreferrer nofollow",
                    }),
                    strong: withClass("strong", { className: "font-semibold" }),
                    em: withClass("em", { className: "italic" }),
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}
