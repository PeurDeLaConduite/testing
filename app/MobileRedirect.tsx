"use client";
import { useEffect } from "react";

/* 
* ancienne version qui fonctionne, on teste la nouvelle

export default function MobileRedirect() {
    useEffect(() => {
        if (window.innerWidth < 900) {
            window.location.href = "https://mobile.peur-de-la-conduite.fr" + window.location.pathname + window.location.search;
        }
    }, []);
    return null;
}
 */

const MOBILE_HOST = "mobile.peur-de-la-conduite.fr";
// Optionnel : si tu veux aussi gérer le retour vers desktop quand large écran
// const DESKTOP_HOST = "peur-de-la-conduite.fr"; // ou "www.peur-de-la-conduite.fr"

export default function MobileRedirect() {
    useEffect(() => {
        const { innerWidth, location } = window;
        const isMobileHost = location.hostname === MOBILE_HOST;

        if (innerWidth < 900 && !isMobileHost) {
            // Préserve protocole, chemin, query ET hash
            const url = new URL(location.href);
            url.hostname = MOBILE_HOST;
            location.replace(url.toString());
        }

        // (Optionnel) logique inverse : si on est sur le sous-domaine mobile mais large écran, revenir sur desktop
        // if (innerWidth >= 900 && isMobileHost) {
        //   const url = new URL(location.href);
        //   url.hostname = DESKTOP_HOST;
        //   location.replace(url.toString());
        // }
    }, []);

    return null;
}
