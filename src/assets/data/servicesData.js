export const servicesData = {
    beginner: {
        id: "beginner",
        ref: "sans-permis",
        prices: [
            { sessions: 1, total: 49.99, perSession: 49.99 },
            { sessions: 3, total: 139.99, perSession: 46.66 },
            { sessions: 5, total: 224.99, perSession: 44.99 },
            { sessions: 10, total: 399.99, perSession: 39.99 },
        ],
        title: "Conducteurs novice",
        subtitle: "Mets toutes les chances de ton côté !",
        intro: "Réussis ton examen et conduis en toute confiance !",
        services: [
            {
                title: "Gestion du stress avant examen !",
                imgSrc:
                    "https://assets.peur-de-la-conduite.fr/img/services/Stress.svg",
                imgAlt: "Logo Gestion du stress avant examen",
                description:
                    "Le stress peut être une cause majeure d’échec. Nous allons identifier ses causes et travailler dessus.",
                id: "gse",
            },
            {
                title: "Situations de Conduite difficiles !",
                id: "scd",
                imgSrc:
                    "https://assets.peur-de-la-conduite.fr/img/services/SCD.svg",
                imgAlt: "Logo Gestion des situations de conduite difficiles",
                description:
                    "Gérer les giratoires, voies rapides ou créneaux en travaillant sur la maîtrise et la confiance.",
            },
            {
                title: "Conduite ACC ou Supervisée",
                imgSrc:
                    "https://assets.peur-de-la-conduite.fr/img/services/ACC.svg",
                imgAlt: "Logo Conduites accompagnée ou supervisée",
                description:
                    "Nous aidons à améliorer la communication et les bonnes pratiques entre l’élève et l’accompagnateur.",
                id: "cas",
            },
            {
                id: "cco",
                title: "Coaching Concentration",
                imgSrc:
                    "https://assets.peur-de-la-conduite.fr/img/services/Concentration.svg",
                imgAlt: "Logo Coaching Concentration",
                description:
                    "Comprendre ce qu'est la concentration et comment l’améliorer pour mieux conduire.",
            },
            {
                id: "mt",
                title: "Maîtrise de la trajectoire !",
                imgSrc:
                    "https://assets.peur-de-la-conduite.fr/img/services/TRAGECTOIRE.svg",
                imgAlt: "Logo Maîtrise de la trajectoire",
                description:
                    "Problèmes de trajectoire ? Nous analysons votre regard et votre technique pour une correction adaptée.",
            },
        ],
    },
    confirmed: {
        id: "confirmed",
        ref: "avec-permis",
        prices: [
            { sessions: 1, total: 59.99, perSession: 59.99 },
            { sessions: 3, total: 169.99, perSession: 56.66 },
            { sessions: 5, total: 279.99, perSession: 55.99 },
            { sessions: 10, total: 499.99, perSession: 49.99 },
        ],
        title: "Conducteurs confirmés",
        subtitle: "Prenez la route en toute sérénité !",
        intro:
            "Boostez votre confiance et renforcez votre maîtrise du volant !",
        services: [
            {
                id: "pac",
                title: "Peur de la conduite (Amaxophobie)",
                imgSrc:
                    "https://assets.peur-de-la-conduite.fr/img/services/Stress.svg",
                imgAlt: "Logo Coaching peur de la conduite",
                description:
                    "Le stress peut être une cause majeure d’échec. Nous allons identifier ses causes et travailler dessus.",
            },
            {
                id: "scd",
                title: "Situations de Conduite difficiles",
                imgSrc:
                    "https://assets.peur-de-la-conduite.fr/img/services/SCD.svg",
                imgAlt: "Logo Gestion des situations de conduite difficiles",
                description:
                    "Gérer les giratoires, voies rapides ou créneaux en travaillant sur la maîtrise et la confiance.",
            },
            {
                id: "pcd",
                title: "Perfectionnement de la Conduite",
                imgSrc:
                    "https://assets.peur-de-la-conduite.fr/img/services/TRAGECTOIRE.svg",
                imgAlt: "Logo Maîtrise de la trajectoire",
                description:
                    "Améliorer sa conduite, réduire la consommation de carburant et anticiper les dangers.",
            },
        ],
    },
};
