import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contactez Peur de la conduite pour obtenir un accompagnement personnalisé en coaching auto. Du lundi au dimanche, de 7h à 20h. Téléphone : +33 6 74 25 91 81, Adresse : 17 Allée Didier Daurat, 76620 Le Havre.",
    alternates: {
        canonical: "https://peur-de-la-conduite.fr/contact",
        media: {
            "only screen and (max-width: 900px)":
                "https://mobile.peur-de-la-conduite.fr/contact",
            "only screen and (min-width: 900px)":
                "https://desktop.peur-de-la-conduite.fr/contact",
        },
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Contact | Peur de la conduite",
        description:
            "Vous avez des questions ou besoin d'un coup de pouce pour vaincre la peur de la conduite ? Contactez-nous dès maintenant pour un accompagnement personnalisé au Havre.",
        url: "https://peur-de-la-conduite.fr/contact",
        siteName: "Peur de la conduite",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url:
                    "https://assets.peur-de-la-conduite.fr/img/about/avatar.webp",
                width: 225,
                height: 225,
                alt: "Mounir Bouakkaz - Coaching conduite au Havre",
            },
        ],
    },
    icons: {
        icon: [
            {
                url:
                    "https://assets.peur-de-la-conduite.fr/img/favicon/logo.svg",
                type: "image/svg+xml",
            },
        ],
    },
    other: {
        "link:preload":
            "https://assets.peur-de-la-conduite.fr/img/contact/bg-contact.svg",
        as: "image",
        type: "image/svg+xml",
    },
};

import ContactHome from "../../src/home/contact-section";

export default function Page() {
    return (
        <section className="section">
            <div className="fixed-menu"></div>
            <ContactHome />
        </section>
    );
}
