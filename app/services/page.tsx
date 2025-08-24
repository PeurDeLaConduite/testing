import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services",
    description: "Découvrez nos services de coaching en conduite au Havre : gestion du stress avant examen, conduite accompagnée, perfectionnement, maîtrise de la trajectoire ! de la trajectoire, situations difficiles, concentration, et coaching anti-amaxophobie. Programmes pour conducteurs débutants et confirmés.",
    alternates: {
        canonical: "https://peur-de-la-conduite.fr/services",
        media: {
            "only screen and (max-width: 900px)": "https://mobile.peur-de-la-conduite.fr/services",
            "only screen and (min-width: 900px)": "https://desktop.peur-de-la-conduite.fr/services",
        },
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Services | Peur de la conduite",
        description: "Gestion du stress, conduite accompagnée, concentration, maîtrise de la trajectoire et coaching anti-amaxophobie au Havre. Découvrez nos programmes personnalisés pour conducteurs débutants et confirmés.",
        url: "https://peur-de-la-conduite.fr/services",
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
import { servicesData } from "../../src/assets/data/servicesData";

import React from "react";
import ServicesIcon from "../../src/components/svg_Icon/Services";
import SectionContainer from "../blog/SectionContainer";
export default function Page() {
    return (
        <SectionContainer
            id="services-page"
            title="Nos Services"
            icon={<ServicesIcon />}
        >
            {Object.values(servicesData).map((category) => (
                <React.Fragment key={category.id}>
                    <div className="ref" id={category.ref}>
                        <section className="category flx-c">
                            <h2 className="category-title">{category.title}</h2>
                            <p className="category-intro">{category.intro}</p>

                            {category.services.map((service, index) => (
                                <article
                                    key={index + "trf"}
                                    className="packs-container"
                                    id={service.id}
                                >
                                    <div className="margin-srv"></div>
                                    <div className="srvP_card-title">
                                        <div className="srvP-img">
                                            <img
                                                src={service.imgSrc}
                                                alt={service.imgAlt}
                                            />
                                        </div>
                                        <div className="srvP-h3">
                                            <h3>{service.title}</h3>
                                        </div>
                                    </div>

                                    <div className="srvP_bull-card">
                                        <div className="bull-bd">
                                            <img
                                                src="/img/utils/bulle-bd.svg"
                                                alt={service.imgAlt}
                                            />
                                        </div>
                                        <p className="service-description">
                                            {service.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </div>
                </React.Fragment>
            ))}
        </SectionContainer>
    );
}
