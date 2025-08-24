import Loader from "../../src/components/loader/Loader";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Réservation",
    alternates: {
        canonical: "https://peur-de-la-conduite.fr/reservation",
        media: {
            "only screen and (max-width: 900px)":
                "https://mobile.peur-de-la-conduite.fr/reservation",
            "only screen and (min-width: 900px)":
                "https://desktop.peur-de-la-conduite.fr/reservation",
        },
    },
};

export default async function Page() {
    // await new Promise((r) => setTimeout(r, 1000));
    return (
        <section className="section" id="hs">
            <div className="fixed-menu"></div>
            <h2>Réservation</h2>
            <p>
                Cette section n’est pas encore disponible. Merci de votre
                patience.
            </p>
            <Loader />
        </section>
    );
}
