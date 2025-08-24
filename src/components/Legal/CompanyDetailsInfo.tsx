// src/components/CompanyDetailsInfo.tsx

import React from "react";

const CompanyDetailsInfo: React.FC = () => {
    return (
        <>
            <section className="pp">
                <h3 className="pp_section-tle">🖥️ Informations légales</h3>
                <ul className="pp_list">
                    <li>
                        <strong>Raison sociale :</strong> Auto-entrepreneur (M.
                        Mounir Bouakkaz)
                    </li>
                    <li>
                        <strong>Forme juridique :</strong> Entrepreneur
                        individuel, micro-entrepreneur
                    </li>
                    <li>
                        <strong>Date de début d’activité :</strong>{" "}
                        23{" "}juillet{" "}2017 (date d’inscription SIRENE){" "}
                        {/* ([allovoisins.com](https://www.allovoisins.com/p/mounirbouakkaz?utm_source=chatgpt.com)) */}
                    </li>
                    <li>
                        <strong>Code APE :</strong> 8553Z – Enseignement de la
                        conduite automobile
                    </li>
                    <li>
                        <strong>SIREN :</strong> 933{" "}849{" "}028
                    </li>
                    <li>
                        <strong>SIRET :</strong>{" "}
                        933{" "}849{" "}028{" "}00016
                    </li>
                    <li>
                        <strong>Immatriculation RCS :</strong> Dispensé
                        (micro-entrepreneur)
                    </li>
                    <li>
                        <strong>Capital social :</strong> Non applicable
                        (micro-entrepreneur)
                    </li>
                    <li>
                        <strong>TVA :</strong> TVA non applicable, art. 293 B du
                        CGI
                    </li>
                </ul>
            </section>{" "}
            <section className="pp">
                <h3 className="pp_section-tle">🏠 Siège social</h3>
                <address className="pp_list">
                    <p>
                        <strong>Adresse :</strong> 17 allée Didier Daurat, 76620
                        Le Havre, France
                    </p>
                </address>
            </section>{" "}
            <section className="pp">
                <h3 className="pp_section-tle">📞 Contacts</h3>
                <ul className="pp_list">
                    <li>
                        <strong>Téléphone :</strong>{" "}
                        <a href="tel:+33674259181">
                            06{" "}74{" "}25{" "}91{" "}81
                        </a>
                    </li>
                    <li>
                        <strong>Email :</strong>{" "}
                        <a href="mailto:contact.peurdelaconduite@gmail.com">
                            contact.peurdelaconduite@gmail.com
                        </a>
                    </li>
                </ul>
            </section>
        </>
    );
};

export default CompanyDetailsInfo;
