"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDensity;
  uniform float uStrength;
  varying vec2 vUv;
  varying float vElevation;

  // Simplex 3D Noise function
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    
    // Apply speed and density parameters to noise position
    vec3 noisePos = vec3(position.xy * (uDensity * 0.25), uTime * uSpeed);
    float elevation = snoise(noisePos) * (uStrength * 0.25);
    
    vec3 newPosition = position;
    newPosition.z += elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vElevation = elevation;
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Dynamic color shifting based on displacement height and UV
    float mixFactor = (vElevation + 0.35) / 0.7;
    
    // Mix Color A and Color B
    vec3 finalColor = mix(uColorA, uColorB, vUv.x);
    
    // Intertwine Color C based on noise elevation
    finalColor = mix(finalColor, uColorC, mixFactor * 0.7);
    
    gl_FragColor = vec4(finalColor, 0.85);
  }
`;

type ShaderGradientProps = {
  animate?: string;
  axesHelper?: string;
  brightness?: number;
  cAzimuthAngle?: number;
  cDistance?: number;
  cPolarAngle?: number;
  cameraZoom?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  destination?: string;
  embedMode?: string;
  envPreset?: string;
  format?: string;
  fov?: number;
  frameRate?: number;
  gizmoHelper?: string;
  grain?: string;
  lightType?: string;
  pixelDensity?: number;
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  range?: string;
  rangeEnd?: number;
  rangeStart?: number;
  reflection?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  shader?: string;
  type?: string;
  uAmplitude?: number;
  uDensity?: number;
  uFrequency?: number;
  uSpeed?: number;
  uStrength?: number;
  uTime?: number;
  wireframe?: boolean;
  urlString?: string;
};

const ShaderGradientContext = createContext<{
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeProps: ShaderGradientProps;
  setActiveProps: (props: ShaderGradientProps) => void;
} | null>(null);

export function ShaderGradientCanvas({ 
  children, 
  style 
}: { 
  children: React.ReactNode; 
  style?: React.CSSProperties; 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProps, setActiveProps] = useState<ShaderGradientProps>({});

  return (
    <ShaderGradientContext.Provider value={{ containerRef, activeProps, setActiveProps }}>
      <div
        ref={containerRef}
        style={style}
        className="absolute inset-0 -z-10 h-full w-full overflow-hidden opacity-30 select-none pointer-events-none"
      />
      {children}
    </ShaderGradientContext.Provider>
  );
}

export function ShaderGradient(props: ShaderGradientProps) {
  const ctx = useContext(ShaderGradientContext);

  useEffect(() => {
    if (ctx) {
      ctx.setActiveProps(props);
    }
  }, [props, ctx]);

  useEffect(() => {
    if (!ctx || !ctx.containerRef.current) return;

    const container = ctx.containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const active = { ...props, ...ctx.activeProps };

    // Default parameters configuration matching the user props specification
    const config = {
      color1: active.color1 || "#ff7a29",
      color2: active.color2 || "#ffc94d",
      color3: active.color3 || "#ff4d3e",
      uSpeed: active.uSpeed ?? 0.3,
      uDensity: active.uDensity ?? 1.5,
      uStrength: active.uStrength ?? 1.5,
      rotationX: active.rotationX ?? 50,
      rotationY: active.rotationY ?? 0,
      rotationZ: active.rotationZ ?? -60,
    };

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Geometry and Material
    const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);
    
    const uniforms = {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(config.color1) },
      uColorB: { value: new THREE.Color(config.color2) },
      uColorC: { value: new THREE.Color(config.color3) },
      uSpeed: { value: config.uSpeed },
      uDensity: { value: config.uDensity },
      uStrength: { value: config.uStrength },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    
    // Apply Euler rotations based on active props (degrees to radians conversion)
    mesh.rotation.x = (config.rotationX * Math.PI) / 180;
    mesh.rotation.y = (config.rotationY * Math.PI) / 180;
    mesh.rotation.z = (config.rotationZ * Math.PI) / 180;
    
    scene.add(mesh);

    // 5. Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 6. Animation loop
    const startTime = performance.now();
    let animationFrameId: number;

    const animateLoop = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      uniforms.uTime.value = elapsedTime;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animateLoop();

    // 7. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.innerHTML = "";
    };
  }, [ctx, ctx?.activeProps, props]);

  return null;
}
