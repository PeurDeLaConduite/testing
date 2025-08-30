// src/app/connexion/PostLoginUserNameGate.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useUserNameForm } from "@entities/models/userName/hooks";
import { onUserNameUpdated } from "@entities/models/userName/bus";
import type { UserNameType } from "@entities/models/userName";
import UserNameModal from "@/src/Profile/UserNameModal";
import { useRouter } from "next/navigation";

export default function PostLoginUserNameGate() {
    const { authStatus, user } = useAuthenticator((ctx) => [ctx.authStatus, ctx.user]);
    const router = useRouter();

    const [editingProfile] = useState<UserNameType | null>(null);
    const {
        form: { userName },
        refresh,
    } = useUserNameForm(editingProfile);

    const [showModal, setShowModal] = useState(false);
    const redirectedRef = useRef(false); // évite les redirections multiples

    // Quand l'utilisateur devient authentifié, on charge son userName
    useEffect(() => {
        if (authStatus === "authenticated" && user) {
            void refresh();
        } else {
            setShowModal(false);
        }
    }, [authStatus, user, refresh]);

    // Se resynchroniser si le pseudo est mis à jour ailleurs
    useEffect(() => {
        if (authStatus !== "authenticated") return;
        const unsub = onUserNameUpdated(() => {
            void refresh();
        });
        return unsub;
    }, [authStatus, refresh]);

    // Ouvrir/fermer le modal selon la présence du pseudo
    useEffect(() => {
        if (authStatus !== "authenticated") return;

        if (!userName) {
            setShowModal(true);
            return;
        }

        setShowModal(false);

        if (!redirectedRef.current) {
            redirectedRef.current = true;

            const params =
                typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

            const raw = params?.get("redirect") ?? "/profile";
            let to = "/profile";
            try {
                const dec = decodeURIComponent(raw);
                to = /^\/(?!\/)/.test(dec) ? dec : "/profile"; // ← only same-origin path
            } catch {
                /* ignore */
            }

            router.replace(to);
        }
    }, [authStatus, userName, router]);

    // Tant qu'on n'est pas authentifié, on ne rend rien (la page /connexion gère le login)
    if (authStatus !== "authenticated") return null;

    return <UserNameModal isOpen={showModal} onClose={() => setShowModal(false)} />;
}
