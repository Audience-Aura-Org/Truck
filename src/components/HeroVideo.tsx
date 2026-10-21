"use client";

import { useEffect, useRef, useState } from "react";

const videos = ["/assets/hero-bg.mp4", "/assets/hero-bg2.mp4"];

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    // React does not render the `muted` attribute into server HTML, and mobile
    // browsers only autoplay videos that are muted and inline, so set these directly.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // If the browser still blocks autoplay, start on the first interaction.
    const resume = () => {
      if (video.paused) video.play().catch(() => {});
    };
    const events = ["touchstart", "click", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, resume, { once: true, passive: true }));
    document.addEventListener("visibilitychange", resume);

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
      events.forEach((e) => window.removeEventListener(e, resume));
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    // Only swap the source when it changes, so the first load isn't restarted.
    if (!video.currentSrc.endsWith(videos[currentIndex])) video.src = videos[currentIndex];
    video.play().catch(() => {});
  }, [currentIndex]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload="auto"
    >
      <source src={videos[0]} type="video/mp4" />
    </video>
  );
}
