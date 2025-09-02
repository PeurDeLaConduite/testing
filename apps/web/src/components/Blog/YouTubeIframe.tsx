import React from "react";

type Props = {
    ytId: string;
    isShort?: boolean;
    title?: string;
    iframeAllow?: string | false;
    iframeTabIndex?: number | false;
    onLoad?: () => void;
};

export default function YouTubeIframe({
    ytId,
    title,
    iframeAllow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    iframeTabIndex = 0,
    onLoad,
}: Props) {
    return (
        <iframe
            className="video-embed__iframe"
            src={`https://www.youtube.com/embed/${ytId}?playsinline=1`}
            {...(iframeAllow !== false ? { allow: iframeAllow } : {})}
            allowFullScreen
            title={title || "YouTube video"}
            loading="lazy"
            {...(iframeTabIndex !== false ? { tabIndex: iframeTabIndex } : {})}
            onLoad={onLoad}
            style={{
                width: "100%",
                height: "100%",
                border: 0,
                opacity: 1,
                transition: "opacity 0.3s",
            }}
        />
    );
}
