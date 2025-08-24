import React from "react";
type SectionContainerProps = {
    children: React.ReactNode;
    id?: string;
    title?: React.ReactNode;
    icon?: React.ReactNode;
};

const SectionContainer = React.memo(function SectionContainer({
    children,
    id,
    title,
    icon,
}: SectionContainerProps) {
    return (
        <section className="section page" id={id}>
            <div className="fixed-menu" />
            
            <div className="container">
                <div className="page-title">
                    {icon}
                    <h1 className="title">{title}</h1>
                </div>
                {children}
            </div>
        </section>
    );
});

// Optionnel : pour le debug en devtools
SectionContainer.displayName = "SectionContainer";

export default SectionContainer;
