// src/components/Profile/UserNameModal.tsx
"use client";

import React, { useEffect, useMemo } from "react";
import Modal from "react-modal-component-by-jeremy";
import UserNameManager from "./UserNameManager";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useUserNameForm } from "@entities/models/userName/hooks";
import { onUserNameUpdated } from "@entities/models/userName/bus";
import type { UserNameType } from "@entities/models/userName";
import { BackButton } from "@components/buttons";
import Link from "next/link";

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

    useEffect(() => {
        if (authStatus === "authenticated" && user) void refresh();
    }, [authStatus, user, refresh]);

    useEffect(() => {
        const unsub = onUserNameUpdated(() => {
            void refresh();
        });
        return unsub;
    }, [refresh]);

    const canClose = useMemo(() => !!userName && userName.trim().length > 0, [userName]);

    const handleClose = () => {
        if (!canClose) {
            // Tu peux afficher un toast/erreur ici si tu veux
            return;
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Mon pseudo public"
            type="info"
            closeOnEsc={false}
            closeOnOverlayClick={false}
            hideCloseButton={!canClose}
        >
            {!canClose && (
                <div className="content-info">
                    <p className="error-message">
                        <span>
                            *<b>Veuillez choisir un pseudo</b> avant de continuer.
                        </span>
                    </p>
                    <p className="info-message">
                        <b>🚧 Route barrée</b> : il vous sera impossible d’avancer tant que ce champ
                        restera vide.
                    </p>
                    <p className="info-message">
                        Cette fenêtre restera ouverte jusqu’à ce que vous ayez trouvé{" "}
                        <b>le bon pseudo</b> !
                    </p>
                </div>
            )}
            <UserNameManager />
            {!canClose && (
                <span className="flx-x">
                    <BackButton
                        href="./"
                        label="EXIT"
                        className="bck-ico"
                        size="medium"
                        variantType="icon"
                    />
                    <Link href="./" className="info-message">
                        Menu principal
                    </Link>
                </span>
            )}
        </Modal>
    );
}
