"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { HeroFigure } from "./HeroFigure";
import { ParticleField } from "./ParticleField";
import { CameraRig } from "./CameraRig";

export function HeroCanvas({ scrollY }: { scrollY: () => number }) {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.75]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Slightly lower cap on smaller devices
    if (window.innerWidth < 768) setDpr([1, 1.4]);
  }, []);

  return (
    <Canvas
      className="!fixed inset-0 !h-screen !w-screen"
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 4.2], fov: 40, near: 0.1, far: 100 }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#0a0908"]} />
      <fog attach="fog" args={["#0a0908", 5, 14]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 3]} intensity={0.9} color="#f4f1ea" />
      <pointLight position={[-2, -1, 2]} intensity={0.35} color="#b8492a" />

      <Suspense fallback={null}>
        <CameraRig scrollY={scrollY} reducedMotion={reduced} />
        <HeroFigure />
        <ParticleField count={reduced ? 600 : 1400} />
      </Suspense>
    </Canvas>
  );
}
