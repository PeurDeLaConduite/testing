// src/context/DataBlogContext.tsx
"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useMemo,
} from "react";
import type { BlogData } from "@src/types/blog";

const PUBLIC_DATA_URL =
    "https://amplify-d2jefuxcjjakai-ma-publiquestoragebucketac0-tjlluvtci6g6.s3.eu-west-3.amazonaws.com/publique-storage/data.json";

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

    // Charge le JSON depuis l’URL publique
    async function fetchData() {
        try {
            setLoading(true);
            const res = await fetch(PUBLIC_DATA_URL);
            if (!res.ok) throw new Error(`Erreur fetch : ${res.status}`);
            const json = (await res.json()) as BlogData;
            setData(json);
            setError(null);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const value = useMemo(
        () => ({ data, loading, error }),
        [data, loading, error]
    );

    return (
        <DataBlogContext.Provider value={value}>
            {children}
        </DataBlogContext.Provider>
    );
}

export function useDataBlog() {
    const ctx = useContext(DataBlogContext);
    if (!ctx) throw new Error("useDataBlog doit être utilisé dans un DataBlogProvider");
    return ctx;
}
