import React from "react";

export default function BackgroundVideo() {
  return (
    <>
      {/* Video layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          title="vimeo-background"
          src="https://player.vimeo.com/video/1120984476?background=1&autoplay=1&muted=1&loop=1&playsinline=1&dnt=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="vimeo-cover"
          style={{ pointerEvents: "none", backgroundColor: "transparent" }}
          loading="eager"
        />
      </div>

      {/* Dim overlay */}
      <div className="absolute inset-0 z-10 bg-black/30" />
    </>
  );
}
