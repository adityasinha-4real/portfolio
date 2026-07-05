"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const CAMERA_KEYFRAMES = [
  new THREE.Vector3(0, 0, 4.2), // hero
  new THREE.Vector3(-1.5, 0.4, 5.0), // about
  new THREE.Vector3(1.6, -0.6, 6.2), // projects
  new THREE.Vector3(-0.8, 0.8, 7.4), // tech
  new THREE.Vector3(0.4, -0.2, 8.6), // experience
  new THREE.Vector3(0, 0.3, 9.6), // contact
];

export function CameraRig({
  scrollY,
  reducedMotion = false,
}: {
  scrollY: () => number;
  reducedMotion?: boolean;
}) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  useFrame(() => {
    const y = scrollY();
    const docHeight = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, y / docHeight));

    // Interpolate between keyframes
    const segs = CAMERA_KEYFRAMES.length - 1;
    const scaled = progress * segs;
    const i = Math.min(segs - 1, Math.floor(scaled));
    const t = scaled - i;
    // ease
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const a = CAMERA_KEYFRAMES[i];
    const b = CAMERA_KEYFRAMES[i + 1];
    target.current.lerpVectors(a, b, eased);

    // Mouse parallax offsets
    if (!reducedMotion) {
      target.current.x += mouse.current.x * 0.25;
      target.current.y -= mouse.current.y * 0.18;
    }

    camera.position.lerp(target.current, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
