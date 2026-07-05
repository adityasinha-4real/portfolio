export const figureFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.4);

    // Base ink-to-bone gradient driven by noise
    vec3 base = mix(uColorA, uColorB, smoothstep(-0.6, 0.6, vNoise));
    // Fresnel rim in bone
    vec3 rim = mix(base, vec3(0.96, 0.94, 0.90), fresnel * 0.85);
    // Subtle warm accent in the shadow pockets
    vec3 accent = vec3(0.72, 0.28, 0.16);
    rim = mix(rim, accent, (1.0 - fresnel) * 0.06 * smoothstep(0.0, 1.0, -vNoise));

    float alpha = uOpacity * (0.55 + fresnel * 0.45);
    gl_FragColor = vec4(rim, alpha);
  }
`;
