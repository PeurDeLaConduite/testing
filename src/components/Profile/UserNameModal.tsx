// src/components/Profile/UserNameModal.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal-component-by-jeremy";
import UserNameManager from "./UserNameManager";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useUserNameForm } from "@entities/models/userName/hooks";
import { onUserNameUpdated } from "@entities/models/userName/bus";
import type { UserNameType } from "@entities/models/userName";
import Tabulation from "../../utils/Tabulation";
import { BackButton } from "@components/buttons";
import Link from "next/link";

// 👇 i18n
import messages from "@/src/i18n/fr/usernameModal.json";

interface UserNameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

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

    // Sélecteurs i18n
    const t = (path: string) =>
        path.split(".").reduce((acc: any, key) => (acc ? acc[key] : undefined), messages);
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
                <div
                    className="content-info_head"
                    role={t("usernameModal.common.aria.alertRole") as "alert"}
                    aria-live="assertive"
                >
                    <p className="info-message">{t("usernameModal.common.goal")}</p>
                    <p className="info-message">
                        <i>{t("usernameModal.phase1.tip")}</i>
                    </p>
                </div>
            )}
            {/* Bloc d'erreur + humour (Phase 2) */}
            {!canClose && triedClose && (
                <div
                    className="content-info_head"
                    role={t("usernameModal.common.aria.alertRole") as "alert"}
                    aria-live="assertive"
                >
                    <p className="error-message">
                        <b>{t("usernameModal.phase2.error")}</b>
                    </p>
                    <p className="info-message">{t("usernameModal.phase2.humor")}</p>
                </div>
            )}
            {/* Champ + aides + notes (le champ est rendu par UserNameManager) */}
            <div>
                {/* 
          On passe au UserNameManager de quoi configurer l'input (id, placeholder, aria-describedby).
          Si ton UserNameManager n'accepte pas encore ces props, ajoute-les (cf. section 3).
        */}
                <UserNameManager />
                <div className="content-info_footer ">
                    <p id="username-help" className="info-message">
                        {t("usernameModal.common.helper")}
                    </p>
                    <p id="privacy-note" className="info-message">
                        {t("usernameModal.common.privacyNote")}{" "}
                        <Link href="/confidentialite" className="link">
                            {t("usernameModal.common.privacyLink")}
                        </Link>
                    </p>
                </div>
                {/* Helpers & confidentialité (liés via aria-describedby) */}
            </div>

            {/* Lien de sortie (optionnel) en Phase 2 */}
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
