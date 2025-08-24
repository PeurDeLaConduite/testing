"use client";

import React, { Suspense, lazy, useState } from "react";
import Loader from "../loader/Loader";
import YouTubePlaceholder from "./YouTubePlaceholder";

function getYouTubeId(url?: string): string | null {
    if (typeof url !== "string") return null;
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
        if (u.hostname.includes("youtube.com")) {
            if (u.pathname.startsWith("/shorts/"))
                return u.pathname.split("/")[2];
            if (u.pathname.startsWith("/embed/"))
                return u.pathname.split("/")[2];
            if (u.pathname.startsWith("/v/")) return u.pathname.split("/")[2];
            return u.searchParams.get("v");
        }
    } catch {}
    return null;
}

function isYoutubeShort(url?: string) {
    if (!url) return false;
    try {
        const u = new URL(url);
        return (
            u.hostname.includes("youtube.com") &&
            u.pathname.startsWith("/shorts/")
        );
    } catch {
        return false;
    }
}

const YouTubeIframe = lazy(() => import("./YouTubeIframe"));

type Props = {
    url?: string;
    title?: string;
    iframeAllow?: string | false;
    iframeTabIndex?: number | false;
};

const VideoEmbed: React.FC<Props> = ({
    url,
    title,
    iframeAllow,
    iframeTabIndex,
}) => {
    const ytId = getYouTubeId(url);
    const isShort = isYoutubeShort(url);
    const [showPlayer, setShowPlayer] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    if (ytId) {
        return (
            <div
                className={`video-embed${isShort ? " video-embed--short" : ""}`}
                style={{ position: "relative" }}
            >
                {!showPlayer && (
                    <YouTubePlaceholder
                        ytId={ytId}
                        title={title}
                        onClick={() => setShowPlayer(true)}
                    />
                )}
                {showPlayer && !iframeLoaded && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#000",
                            zIndex: 2,
                        }}
                    >
                        <Loader />
                    </div>
                )}
                {showPlayer && (
                    <Suspense fallback={null}>
                        <YouTubeIframe
                            ytId={ytId}
                            title={title}
                            iframeAllow={iframeAllow}
                            iframeTabIndex={iframeTabIndex}
                            onLoad={() => setIframeLoaded(true)}
                        />
                    </Suspense>
                )}
            </div>
        );
    }

    return null;
};

export default React.memo(VideoEmbed);
