import { MenuLinks } from "./interfaces/menu";
import { contentIndex } from "./content/index";

export const menuItems: MenuLinks = {
    mainLink: [
        {
            id: "menu-home",
            title: "Accueil",
            class: "",
            path: "/",
            AnchorId: "#slider",
            svg: "Home",
            subItems: [
                {
                    id: "menu-slider",
                    title: "Slider",
                    AnchorId: "#slider",
                    class: "",
                    content: contentIndex["#slider"], 
                },
                {
                    id: "menu-about",
                    title: "À propos",
                    AnchorId: "#about",
                    class: "",
                    content: contentIndex["#about"], 
                },
                {
                    id: "menu-services",
                    title: "Services",
                    AnchorId: "#services",
                    class: "",
                },
                {
                    id: "menu-contact",
                    title: "Contact",
                    AnchorId: "#contact",
                    class: "",
                },
            ],
        },
        {
            id: "menu-services",
            title: "Services",
            class: "",
            path: "/services",
            AnchorId: "#top",
            svg: "Services",
            subItems: [
                {
                    id: "menu-without-license",
                    title: "Sans Permis",
                    AnchorId: "#sans-permis",
                    class: "",
                },
                {
                    id: "menu-with-license",
                    title: "Avec Permis",
                    AnchorId: "#avec-permis",
                    class: "",
                },
            ],
        },
        {
            id: "menu-blog",
            title: "Blog",
            class: "",
            path: "/blog",
            AnchorId: "#top",
            svg: "Blog",
        },
        {
            id: "menu-prices",
            title: "Tarifs",
            class: "",
            path: "/tarifs",
            AnchorId: "#top",
            svg: "Tarifs",
        },
        {
            id: "menu-contact",
            title: "Contact",
            class: "",
            path: "/contact",
            AnchorId: "#top",
            svg: "Contact",
        },
    ],
    reservation: [
        {
            id: "reservationId",
            title: "Réservation",
            class: "",
            path: "/reservation",
            AnchorId: "#top",
            svg: "Reservation",
        },
    ],
    search: [
        {
            id: "search",
            title: "Rechercher ...",
            class: "",
            path: "/search",
            AnchorId: "#top",
            svg: "Search",
        },
    ],
    connection: [
        {
            id: "connection",
            title: "Se connecter",
            class: "",
            path: "/reservation",
            AnchorId: "#top",
            svg: "Connection",
        },
    ],
};

export type { MenuItem } from "./interfaces/menu"; 

/*
src/
├── interfaces/
│   ├── menu.ts         # Définition des interfaces pour le menu
│   ├── content.ts      # Définition des interfaces pour les contenus
├── data/
│   ├── menuItems.ts    # Données liées au menu
│   ├── sections.ts     # Liste des sections
│   ├── content/
│       ├── slider.ts   # Contenu pour la section slider
│       ├── about.ts    # Contenu pour la section about
│       ├── index.ts    # Index pour associer les sections et leurs contenus
├── utils/
│   ├── attachContent.ts # Fonction utilitaire pour attacher les con
*/
