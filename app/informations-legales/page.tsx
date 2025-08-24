import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Informations légales",
    description: "Consultez les mentions légales et la politique de confidentialité du site Peur de la conduite : conditions d'utilisation, gestion des données personnelles, sécurité des informations et propriété intellectuelle.",
    alternates: {
        canonical: "https://peur-de-la-conduite.fr/informations-legales",
        media: {
            "only screen and (max-width: 900px)": "https://mobile.peur-de-la-conduite.fr/informations-legales",
            "only screen and (min-width: 900px)": "https://desktop.peur-de-la-conduite.fr/informations-legales",
        },
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Informations légales | Peur de la conduite",
        description: "Mentions légales et politique de confidentialité de Peur de la conduite. Informations sur l'utilisation du site, la gestion des données personnelles et les droits des utilisateurs.",
        url: "https://peur-de-la-conduite.fr/informations-legales",
        siteName: "Peur de la conduite",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "https://assets.peur-de-la-conduite.fr/img/about/avatar.webp",
                width: 225,
                height: 225,
                alt: "Mounir Bouakkaz - Coaching conduite au Havre",
            },
        ],
    },
    icons: {
        icon: [
            {
                url: "https://assets.peur-de-la-conduite.fr/img/favicon/logo.svg",
                type: "image/svg+xml",
            },
        ],
    },
};
import PrivacyPolicy from "../../src/components/PrivacyPolicy";
import TermsOfUse from "../../src/components/TermsOfUse";
export default async function Page() {
    return (
        <section className="section" id="s1">
            <div className="fixed-menu"></div>
            <div className="s1">
                <h1 className="pp_title">Informations légales</h1>
                <TermsOfUse />
                <PrivacyPolicy />
            </div>
        </section>
    );
}
