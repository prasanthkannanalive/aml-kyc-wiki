"use client";

import { Lottie } from "lottie-react";

export default function LottiePlayer({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <Lottie
      src={src}
      loop
      autoplay
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
