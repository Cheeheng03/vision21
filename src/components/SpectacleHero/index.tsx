"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useScrollAnimation } from "./useScrollAnimation";
import BlurOverlay from "./BlurOverlay";

const SpectacleScene = dynamic(() => import("./SpectacleScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#ffffff]">
      <p className="text-white/40 text-lg">Loading 3D scene...</p>
    </div>
  ),
});

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#ffffff]">
          <p className="text-red-400 text-sm">
            WebGL error: {this.state.error}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function SpectacleHero() {
  const { sectionRef, progressRef, scrollYProgress } = useScrollAnimation();

  return (
    <>
      <BlurOverlay scrollYProgress={scrollYProgress} />

      <section
        ref={sectionRef}
        className="relative"
        style={{ minHeight: "300vh", background: "#ffffff" }}
      >
        {/* Sticky wrapper */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* 3D Canvas */}
          <div className="absolute inset-0" style={{ background: "#ffffff" }}>
            <CanvasErrorBoundary>
              <SpectacleScene progressRef={progressRef} />
            </CanvasErrorBoundary>
          </div>
        </div>
      </section>
    </>
  );
}
