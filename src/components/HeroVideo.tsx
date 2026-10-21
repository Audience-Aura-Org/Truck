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

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = videos[currentIndex];
    video.play().catch(() => {});
  }, [currentIndex]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      playsInline
      preload="auto"
    >
      <source src={videos[0]} type="video/mp4" />
    </video>
  );
}
