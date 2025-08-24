"use client";
import { useEffect } from "react";

export default function MobileRedirect() {
    useEffect(() => {
        if (window.innerWidth < 900) {
            window.location.href = "https://mobile.peur-de-la-conduite.fr" + window.location.pathname + window.location.search;
        }
    }, []);
    return null;
}
