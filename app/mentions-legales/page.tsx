import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions légales",
    description: "Consultez les mentions légales du site Peur de la conduite : informations sur l’éditeur du site, le responsable de publication, le webmaster, l’hébergement et les droits liés aux données personnelles (RGPD).",
    alternates: {
        canonical: "https://peur-de-la-conduite.fr/mentions-legales",
        media: {
            "only screen and (max-width: 900px)": "https://mobile.peur-de-la-conduite.fr/mentions-legales",
            "only screen and (min-width: 900px)": "https://desktop.peur-de-la-conduite.fr/mentions-legales",
        },
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Mentions légales | Peur de la conduite",
        description: "Toutes les informations légales concernant Peur de la conduite : éditeur, responsable du site, hébergeur AWS, politique de confidentialité et RGPD.",
        url: "https://peur-de-la-conduite.fr/mentions-legales",
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
import LegalNotices from "../../src/components/Legal/LegalNotices";

export default async function Page() {
    return (
        <section className="section" id="s1">
            <div className="fixed-menu"></div>
            <div className="s1">
                <h1 className="pp_title">Mentions légales</h1>
                <LegalNotices />
            </div>
        </section>
    );
}
