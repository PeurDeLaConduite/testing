"use client";

import React from "react";

interface Props {
    ytId: string;
    title?: string;
    onClick: () => void;
}

export default function YouTubePlaceholder({ ytId, title, onClick }: Props) {
    const thumbSrc = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

    return (
        <button
            type="button"
            className="yt-pl"
            aria-label={`Lire la vidéo ${title ?? ""}`.trim()}
            onClick={onClick}
            style={{
                display: "block",
                width: "100%",
                height: "100%",
                padding: 0,
                border: 0,
                background: "transparent",
                cursor: "pointer",
                position: "relative",
                borderRadius: "inherit",
            }}
        >
            <img
                src={thumbSrc}
                alt={title || "YouTube thumbnail"}
                loading="lazy"
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            <span
                className="yt-pl__icon"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.6)",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                >
                    <path d="M8 5v14l11-7z" />
                </svg>
            </span>
        </button>
    );
}
