// src/amplify/useAmplifyReady.ts
"use client";

import { useEffect, useState } from "react";
import type { AmplifyGlobal } from "@types/web/amplify/global";

export function useAmplifyReady() {
    const [ready, setReady] = useState<boolean>(
        !!(globalThis as AmplifyGlobal).__AMPLIFY_CONFIGURED__
    );

    useEffect(() => {
        if (ready) return;

        // Fallback ultra-léger: on ré-importe setup si, pour une raison X, ce n’est pas encore fait
        let canceled = false;
        import("@src/amplify/setup")
            .then(() => {
                if (!canceled) setReady(!!(globalThis as AmplifyGlobal).__AMPLIFY_CONFIGURED__);
            })
            .catch((e) => {
                console.error("[Amplify] setup import failed:", e);
            });
        return () => {
            canceled = true;
        };
    }, [ready]);

    return ready;
}
