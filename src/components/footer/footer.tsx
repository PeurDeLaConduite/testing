"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SocialLinks from "../../home/contact-section/contactCard/SocialLinks";

export default function Footer() {
    const [dataReduced, setDataReduced] = useState("desktop");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 1024) {
                setDataReduced("mobile");
            } else if (width < 1170) {
                setDataReduced("tablet");
            } else if (width < 1440) {
                setDataReduced("desktopReduced");
            } else {
                setDataReduced("desktop");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <footer className="footer">
            <div className="container">
                <div className="ft_p-1">
                    <nav data-reduced={dataReduced}>
                        <Link href="/mentions-legales">Mentions légales</Link>
                        <Link href="/informations-legales">Informations légales</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>
                    <p>Peur-de-la-conduite.fr © 2024. Tous droits réservés.</p>
                </div>
                <div className="ft_p-2">
                    <SocialLinks />
                </div>
            </div>
        </footer>
    );
}
