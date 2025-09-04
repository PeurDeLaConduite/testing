// src/context/DataBlogContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import type { BlogData } from "@packages/types/web/blog";
import { getBlogData } from "@packages/services/app/getBlogData";

interface DataBlogContextProps {
    data: BlogData | null;
    loading: boolean;
    error: Error | null;
}

const DataBlogContext = createContext<DataBlogContextProps | undefined>(undefined);

export function DataBlogProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<BlogData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    async function fetchData() {
        try {
            setLoading(true);
            const json = await getBlogData();
            setData(json);
            setError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error(String(err)));
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void fetchData();
    }, []);

    const value = useMemo(() => ({ data, loading, error }), [data, loading, error]);

    return <DataBlogContext.Provider value={value}>{children}</DataBlogContext.Provider>;
}

export function useDataBlog() {
    const ctx = useContext(DataBlogContext);
    if (!ctx) throw new Error("useDataBlog doit être utilisé dans un DataBlogProvider");
    return ctx;
}
