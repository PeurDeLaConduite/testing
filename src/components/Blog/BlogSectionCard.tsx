// src/components/Blog/SectionCard.tsx
import React from "react";
import { Section, Post, Author } from "@src/types/blog";
import BlogList from "./BlogList";
import ButtonLink from "../button/ButtonLink";

interface SectionCardProps {
    section: Section;
    posts: Post[];
    authors: Author[];
}

export default function BlogSectionCard({
    section,
    posts,
    authors,
}: SectionCardProps) {
    // Génère un ID unique pour le titre de la section
    const headingId = `section-title-${section.slug}`;

    return (
        <section className="section-card" aria-labelledby={headingId}>
            <div className="section-card-header">
                <h2 className="section-card-title" id={headingId}>
                    {section.title}
                </h2>
                <p className="section-card-desc">{section.description}</p>
                <div className="section-card-link">
                    <ButtonLink href={`/blog/sections/${section.slug}`}>
                        Tous les articles !
                    </ButtonLink>
                </div>
            </div>
            <div className="section-card-content">
                <BlogList posts={posts} authors={authors} />
            </div>
        </section>
    );
}
