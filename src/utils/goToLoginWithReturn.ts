// src/utils/auth/goToLoginWithReturn.ts
"use client";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Options = {
    replace?: boolean; // default false (push). Pour un guard, mets true.
    skipIfAlreadyOnLogin?: boolean; // évite de “naviguer” si on est déjà sur /connexion
    loginPath?: string; // default "/connexion"
};

export function goToLoginWithReturn(router: AppRouterInstance, opts: Options = {}) {
    const { replace = false, skipIfAlreadyOnLogin = true, loginPath = "/connexion" } = opts;

    const { pathname, search, hash } = window.location;

    if (skipIfAlreadyOnLogin && pathname.startsWith(loginPath)) {
        return; // déjà sur /connexion → rien à faire
    }

    const redirect = encodeURIComponent(`${pathname}${search}${hash}`);
    const url = `${loginPath}?redirect=${redirect}`;

    if (replace) router.replace(url);
    else router.push(url);
}
