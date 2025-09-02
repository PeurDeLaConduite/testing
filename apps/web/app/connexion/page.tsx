// src/app/connexion/page.tsx
import { Metadata } from "next";
// import AuthProvider from "@src/auth/Authentication/auth-provider";
import Authentication from "@src/auth/Authentication/Authentication";
import PostLoginUserNameGate from "@src/auth/Authentication/PostLoginUserNameGate";

export const metadata: Metadata = {
    title: "Connexion",
    alternates: {
        canonical: "https://peur-de-la-conduite.fr/connexion",
        media: {
            "only screen and (max-width: 900px)": "https://mobile.peur-de-la-conduite.fr/connexion",
            "only screen and (min-width: 900px)":
                "https://desktop.peur-de-la-conduite.fr/connexion",
        },
    },
};

export default function Page() {
    return (
        // <AuthProvider>
        <section className="section" id="connexion">
            <div className="fixed-menu"></div>
            <div className="fixed-menu"></div>

            {/* Formulaire/amplify authenticator */}
            <Authentication />

            {/* Après login :
            - si userName manquant => ouvre UserNameModal
            - sinon => redirige vers ?redirect= ou /profile */}
            <PostLoginUserNameGate />
        </section>
        // </AuthProvider>
    );
}
