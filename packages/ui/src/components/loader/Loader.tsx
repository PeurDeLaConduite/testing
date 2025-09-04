import Image from "next/image";
import React from "react";

export default function Loader() {
    return (
        <div className="loader">
            <div className="ld-circleBG"></div>
            <div className="ld-frame">
                <Image
                    src="https://assets.peur-de-la-conduite.fr/img/retroviseur.svg"
                    alt="loader"
                    width={225}
                    height={225}
                />
                <div className="ld-dot2"></div>
                <div className="ld-dot1"></div>
                <div className="ld-dot"></div>
            </div>
        </div>
    );
}
