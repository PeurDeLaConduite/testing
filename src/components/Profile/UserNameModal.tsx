// src/components/Profile/UserNameModal.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal-component-by-jeremy";
import UserNameManager from "./UserNameManager";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useUserNameForm } from "@entities/models/userName/hooks";
import { onUserNameUpdated } from "@entities/models/userName/bus";
import type { UserNameType } from "@entities/models/userName";
import { BackButton } from "@components/buttons";
import Link from "next/link";

// 👇 i18n
import messages from "@/src/i18n/fr/usernameModal.json";

interface UserNameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/** Utils i18n */
const t = (path: string): string => {
    return path.split(".").reduce<any>((acc, key) => (acc ? acc[key] : undefined), messages) ?? "";
};

const html = (s: string) => ({ __html: s });

export default function UserNameModal({ isOpen, onClose }: UserNameModalProps) {
    const { authStatus, user } = useAuthenticator((ctx) => [ctx.authStatus, ctx.user]);
    const {
        form: { userName },
        refresh,
    } = useUserNameForm(null as unknown as UserNameType | null);

    // Nouvel état : tentative de fermeture sans pseudo
    const [triedClose, setTriedClose] = useState(false);

    useEffect(() => {
        if (authStatus === "authenticated" && user) void refresh();
    }, [authStatus, user, refresh]);

    useEffect(() => {
        const unsub = onUserNameUpdated(() => void refresh());
        return unsub;
    }, [refresh]);

    // Si le user a finalement mis un pseudo, on réinitialise l'état d’avertissement
    useEffect(() => {
        if (userName && userName.trim().length > 0) setTriedClose(false);
    }, [userName]);

    const canClose = useMemo(() => !!userName && userName.trim().length > 0, [userName]);

    const handleClose = () => {
        if (!canClose) {
            setTriedClose(true);
            // Focus sur l'input interne (exige que l'input ait id="userName-input" dans UserNameManager)
            requestAnimationFrame(() => {
                document.getElementById("userName-input")?.focus();
            });
            return;
        }
        onClose();
    };

    // Titres selon la phase
    const title =
        !canClose && triedClose ? t("usernameModal.phase2.title") : t("usernameModal.phase1.title");

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={title}
            type="info"
            closeOnEsc={false}
            closeOnOverlayClick={false}
            hideCloseButton={!canClose}
        >
            {/* Bloc d'intro (Phase 1) */}
            {!canClose && !triedClose && (
                <div className="content-info_head" role="alert" aria-live="assertive">
                    <p
                        className="info-message"
                        dangerouslySetInnerHTML={html(t("usernameModal.common.goal"))}
                    />
                </div>
            )}
            {/* Bloc d'erreur + humour (Phase 2) */}
            {!canClose && triedClose && (
                <div className="content-info_head" role="alert" aria-live="assertive">
                    <p
                        className="error-message"
                        dangerouslySetInnerHTML={html(t("usernameModal.phase2.error"))}
                    />
                    <p
                        className="info-message"
                        dangerouslySetInnerHTML={html(t("usernameModal.phase2.humor"))}
                    />
                </div>
            )}

            {/* Champ + aides + notes (le champ est rendu par UserNameManager) */}
            <div>
                {/* 
          👉 On passe au UserNameManager des props i18n. 
          Si ton UserNameManager n'accepte pas encore ces props, ajoute-les (facultatives).
        */}
                <UserNameManager />
                {!canClose && !triedClose && (
                    <div className="content-info_footer">
                        <p
                            id="privacy-note"
                            className="info-message"
                            dangerouslySetInnerHTML={html(t("usernameModal.common.privacyNote"))}
                        />
                    </div>
                )}
                {!canClose && triedClose && (
                    <div className="content-info_footer" role="alert" aria-live="assertive">
                        <p
                            className="info-message"
                            dangerouslySetInnerHTML={html(t("usernameModal.phase2.humor2"))}
                        />
                        <p
                            id="privacy-note"
                            className="info-message"
                            dangerouslySetInnerHTML={html(t("usernameModal.common.privacyLink"))}
                        />
                    </div>
                )}
            </div>

            {/* Lien de sortie (optionnel) uniquement en Phase 2 */}
            {!canClose && triedClose && (
                <span className="btnInLine">
                    <BackButton
                        href="./"
                        label="EXIT"
                        className="bck-ico"
                        size="medium"
                        variantType="icon"
                    />
                    <Link href="./" className="info-message flx-c">
                        <span>{t("usernameModal.common.returnLink")}</span>
                    </Link>
                </span>
            )}
        </Modal>
    );
}
