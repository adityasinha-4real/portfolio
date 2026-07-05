export const grainVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const grainFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv;
    float n = hash(uv * uResolution + uTime * 60.0);
    float grain = (n - 0.5) * uIntensity;
    gl_FragColor = vec4(vec3(grain), grain * 0.5);
  }
`;
