// src/components/Blog/AuthorSignature.tsx
import React from "react";
import { Author } from "@src/types/blog";

interface AuthorSignatureProps {
    author: Author;
    date: string | Date;
    className?: string;
}
const ava = "https://assets.peur-de-la-conduite.fr/img/about/avatar.webp";
const formatDate = (date: string | Date) => {
    try {
        return new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return date.toString();
    }
};

const AuthorSignature: React.FC<AuthorSignatureProps> = ({
    author,
    date,
    className = "",
}) => (
    <div className={`post-author__meta ${className}`.trim()}>
        <div className="post-author__info">
            <span className="post-author__author">{author.name}</span>
            <time
                className="post-author__date"
                dateTime={
                    typeof date === "string"
                        ? date
                        : (date as Date).toISOString()
                }
            >
                {formatDate(date)}
            </time>
        </div>
        <div className="avatar">
            <img
                src={ava}
                alt={`Avatar de ${author.name}`}
                className="av  shadow"
            />
            <img src={ava} alt={`Avatar de ${author.name}`} className="av " />
        </div>
    </div>
);

export default React.memo(AuthorSignature);
