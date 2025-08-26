"use client";
import React, { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import ConnectForm from "./ConnectForm";

type Props = {
    children: React.ReactNode;
    message?: string;
    buttonLabel?: string;
    className?: string;
};

export default function ConnectItem({
    children,
    message = "Pour afficher cet élément, veuillez vous connecter.",
    buttonLabel = "Se connecter",
    className,
}: Props) {
    const { user } = useAuthenticator();
    const [showAuth, setShowAuth] = useState(false);

    // Si l'utilisateur se connecte, refermer l'auth UI automatiquement
    useEffect(() => {
        if (user && showAuth) setShowAuth(false);
    }, [user, showAuth]);

    if (user) {
        return <>{children}</>;
    }

    return (
        <div className={className}>
            {!showAuth ? (
                <div className="flex flex-col items-start gap-2 p-3 rounded border">
                    <p>{message}</p>
                    <nav className="connect">
                        <div className="group_link-submenu connection nav-padding">
                            <button
                                type="button"
                                className="head-link"
                                onClick={() => setShowAuth(true)}
                                aria-label={buttonLabel}
                            >
                                {buttonLabel}
                            </button>
                        </div>
                    </nav>
                </div>
            ) : (
                <ConnectForm />
            )}
        </div>
    );
}
