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
    // ⚠️ On ne retourne rien avant d’avoir appelé tous les hooks
    const { authStatus, user } = useAuthenticator((ctx) => [ctx.authStatus, ctx.user]);

    // On peut réutiliser le même hook que le manager pour lire le pseudo actuel
    const {
        form: { userName },
        refresh,
    } = useUserNameForm(null as unknown as UserNameType | null);

    // Charger/rafraîchir le pseudo quand on est connecté
    useEffect(() => {
        if (authStatus === "authenticated" && user) void refresh();
    }, [authStatus, user, refresh]);

    // Se resynchroniser si le pseudo est mis à jour ailleurs (le UserNameManager émet cet event)
    useEffect(() => {
        const unsub = onUserNameUpdated(() => {
            void refresh();
        });
        return unsub;
    }, [refresh]);

    // Peut-on fermer ? (pseudo non vide)
    const canClose = useMemo(() => !!userName && userName.trim().length > 0, [userName]);

    // Intercepter la fermeture : tant que le pseudo est vide, on ne ferme pas
    const handleClose = () => {
        if (!canClose) {
            // Tu peux afficher un toast / message ici si tu veux
            // ex: alert("Merci de choisir un pseudo pour continuer.");
            return;
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Zone d’échange partagée"
            type="warning"
            // Si ton Modal supporte ces options, tu peux renforcer le blocage :
            // closeOnEsc={false}
            // closeOnOverlayClick={false}
            // hideCloseButton={!canClose}
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
        </Modal>
    );
}
