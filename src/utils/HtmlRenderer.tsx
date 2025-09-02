"use client";
import React from "react";
import type { JSX } from "react";

type HtmlRendererProps = {
    html?: string;
    paths?: string[];
    t?: (path: string) => string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
};

export default function HtmlRenderer({ html, paths, t, className, as = "div" }: HtmlRendererProps) {
    let content = html ?? "";
    if (!content && Array.isArray(paths) && paths.length) {
        const resolve = t ?? ((p: string) => p);
        content = paths
            .map((p) => resolve(p))
            .filter(Boolean)
            .join("\n\n");
    }
    return React.createElement(as, {
        className,
        dangerouslySetInnerHTML: { __html: content },
    });
}
