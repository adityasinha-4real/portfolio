"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { figureVertex } from "@/shaders/figure.vert";
import { figureFragment } from "@/shaders/figure.frag";

export function HeroFigure() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.35 },
      uProgress: { value: 0 },
      uColorA: { value: new THREE.Color("#0a0908") },
      uColorB: { value: new THREE.Color("#f4f1ea") },
      uOpacity: { value: 0.92 },
    }),
    []
  );

  const innerUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.18 },
      uProgress: { value: 0 },
      uColorA: { value: new THREE.Color("#1a1815") },
      uColorB: { value: new THREE.Color("#b8492a") },
      uOpacity: { value: 0.55 },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    innerUniforms.uTime.value += delta;

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.12;
      innerRef.current.rotation.z += delta * 0.03;
    }
  });

  return (
    <group position={[0.6, 0, 0]}>
      {/* Outer shell — the "figure" */}
      <mesh ref={meshRef} scale={1.35}>
        <icosahedronGeometry args={[1, 48]} />
        <shaderMaterial
          transparent
          side={THREE.DoubleSide}
          uniforms={uniforms}
          vertexShader={figureVertex}
          fragmentShader={figureFragment}
        />
      </mesh>

      {/* Inner core — hint of a warm heart inside */}
      <mesh ref={innerRef} scale={0.85}>
        <icosahedronGeometry args={[1, 36]} />
        <shaderMaterial
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          uniforms={innerUniforms}
          vertexShader={figureVertex}
          fragmentShader={figureFragment}
        />
      </mesh>

      {/* Wireframe halo */}
      <mesh scale={1.55}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial color="#f4f1ea" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}
