"use client";

import { useEffect } from "react";
import { Gradient } from "../lib/Gradient.js";

export default function ClientCanvasBackground() {
  useEffect(() => {
    const gradient = new Gradient();
    // @ts-ignore (hides error in VSCode)
    gradient.initGradient("#gradient-canvas");
    return () => {};
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      data-transition-in
      className="absolute inset-0 left-1/2 z-0 h-screen w-[150%] -translate-x-1/2"
      style={{
        maskImage: "radial-gradient(circle at top, black 0%, transparent 50%)",
        WebkitMaskImage:
          "radial-gradient(circle at top, black 0%, transparent 50%)",
      }}
    />
  );
}
