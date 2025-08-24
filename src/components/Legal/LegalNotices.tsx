// src/components/LegalNotices.tsx

import React from "react";
import CompanyDetailsInfo from "./CompanyDetailsInfo";
import SiteEditorCreator from "./SiteEditorCreator";
import PublicationDirector from "./PublicationDirector";
import ButtonLink from "../button/ButtonLink";
import SiteHost from "./SiteHost";
import ApplicableLaw from "./ApplicableLaw";
import Rgpd from "./Rgpd";
import Cookies from "./Cookies";
const LegalNotices: React.FC = () => {
    return (
        <div className="pp_politique-container">
            <h2 className="pp_title" id="terms-of-use">
                Informations Générales
            </h2>
            <CompanyDetailsInfo />
            <SiteEditorCreator />
            <PublicationDirector />
            <ApplicableLaw />
            <Rgpd />
            <Cookies />
            <SiteHost />
            <section className="pp">
                <h3 className="pp_section-tle">Crédits & conception</h3>
                <p>
                    Site développé par :
                    <br />
                    <strong>Jérémy Maxime Claude Lemaignent</strong> –
                    Entrepreneur individuel (micro-entrepreneur)
                </p>
                <ul className="pp_list">
                    <li>
                        <strong>SIREN :</strong> 983 194 523
                    </li>
                    <li>
                        <strong>SIRET :</strong> 983 194 523 00012
                    </li>
                    <li>
                        <strong>Adresse :</strong> 69 rue Maurice Tronele, 76620
                        Le Havre, France
                    </li>
                    <li>
                        <strong>Email :</strong>{" "}
                        <a href="mailto:web.my.dev@gmail.com">
                            web.my.dev@gmail.com
                        </a>
                    </li>
                    <li>
                        <strong>TVA :</strong> TVA non applicable, art. 293 B du
                        CGI
                    </li>
                </ul>
            </section>{" "}
            <ButtonLink href={"/contact"}>Contact</ButtonLink>
        </div>
    );
};

export default LegalNotices;
