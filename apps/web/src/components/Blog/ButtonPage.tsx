// src/components/button/ButtonPage.tsx
import React from "react";

interface ButtonPageProps {
    href: string;
    className?: string;
}

const ButtonPage: React.FC<ButtonPageProps> = ({ href, className = "" }) => (
    <div className={`button-page ${className}`.trim()}>
        <div className="center-fixed">
            <a className="button-page__back flx-c" title="Retour" href={href}>
                <svg
                    focusable="false"
                    fill="#fff"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ArrowBackIcon"
                >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
                </svg>
            </a>
        </div>
    </div>
);

export default ButtonPage;
