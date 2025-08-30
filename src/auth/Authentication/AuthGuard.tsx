// src/components/auth/AuthGuard.tsx
"use client";

import React, { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { goToLoginWithReturn } from "@utils/goToLoginWithReturn";

type Props = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export default function AuthGuard({ children, fallback = null }: Props) {
    const { authStatus, user } = useAuthenticator((ctx) => [ctx.authStatus, ctx.user]);
    const router = useRouter();

    useEffect(() => {
        if (authStatus === "unauthenticated") {
            goToLoginWithReturn(router, { replace: true }); // 👈 factorisé
        }
    }, [authStatus, router]);

    if (authStatus !== "authenticated" || !user) return <>{fallback}</>;
    return <>{children}</>;
}
