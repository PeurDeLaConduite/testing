"use client";
import { useRouter } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";

export function RequireLoginButton({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { authStatus } = useAuthenticator((ctx) => [ctx.authStatus]);

    const onClick = () => {
        if (authStatus === "authenticated") {
            // action protégée...
            return;
        }
        const { pathname, search, hash } = window.location;
        const redirect = encodeURIComponent(`${pathname}${search}${hash}`);
        router.push(`/connexion?redirect=${redirect}`);
    };

    return <button onClick={onClick}>{children}</button>;
}
