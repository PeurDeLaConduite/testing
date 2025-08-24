// src/components/DevLegalNotices.tsx

import React from "react";

const DevLegalNotices: React.FC = () => (
    <div className="pp_politique-container">
        <h2 className="pp_title" id="terms-of-use">
            Informations Générales
        </h2>
        <section className="pp">
            <h3 className="pp_section-tle">Éditeur / Créateur du site</h3>
            <p>
                <strong>Nom :</strong> Jérémy Maxime Claude Lemaignent
            </p>
            <p>
                <strong>Statut :</strong> Entrepreneur individuel
                (Micro-entrepreneur)
            </p>
            <p>
                <strong>Numéro SIREN :</strong> 983 194 523
            </p>
            <p>
                <strong>Numéro SIRET :</strong> 983 194 523 00012
            </p>
            <p>
                <strong>Code NAF :</strong> 6201Z – Programmation informatique
            </p>
            <p>
                <strong>Adresse :</strong> 69 rue Maurice Tronele, 76620 Le
                Havre, France
            </p>
            <p>
                <strong>Téléphone :</strong> +33 6 35 02 06 41
            </p>
            <p>
                <strong>Email :</strong>{" "}
                <a href="mailto:web.my.dev@gmail.com">web.my.dev@gmail.com</a>
            </p>
            <p>
                <strong>TVA :</strong> TVA non applicable, art. 293 B du CGI
            </p>
            <p>
                <strong>Immatriculation RCS :</strong> Dispensé (statut
                Micro-entrepreneur)
            </p>
        </section>
        <section className="pp">
            <h3 className="pp_section-tle">Hébergeur du site</h3>
            <p>
                <strong>Amazon Web Services EMEA SARL</strong>
            </p>
            <p>38 avenue John F. Kennedy, L-1855 Luxembourg, Luxembourg</p>
            <p>
                <strong>Support :</strong>{" "}
                <a href="mailto:awslux-receivables-support@amazon.com">
                    awslux-receivables-support@amazon.com
                </a>
            </p>
        </section>
    </div>
);

export default DevLegalNotices;
