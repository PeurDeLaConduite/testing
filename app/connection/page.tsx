import { Metadata } from "next";
import Authentication from "@src/app/Authentication/Authentication";

export const metadata: Metadata = {
    title: "Réservation",
    alternates: {
        canonical: "https://peur-de-la-conduite.fr/connection",
        media: {
            "only screen and (max-width: 900px)":
                "https://mobile.peur-de-la-conduite.fr/connection",
            "only screen and (min-width: 900px)":
                "https://desktop.peur-de-la-conduite.fr/connection",
        },
    },
};

export default async function Page() {
    return (
        <section className="section" id="s1">
            <div className="fixed-menu"></div>
            <div className="fixed-menu"></div>
            <Authentication />;
        </section>
    );
}
