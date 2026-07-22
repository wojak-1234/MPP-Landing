"use client";

import {
  ShaderGradient,
  ShaderGradientCanvas,
} from "@shadergradient/react";
import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <ShaderGradientCanvas>
        <ShaderGradient
          control='query'
          urlString='https://shadergradient.co/customize?animate=on&axesHelper=off&brightness=1&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=9.1&color1=%23606080&color2=%238d7dca&color3=%23212121&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.5&uFrequency=0&uSpeed=0.3&uStrength=1.5&uTime=8&wireframe=false'
        />
      </ShaderGradientCanvas>

      {/* 가독성을 위한 오버레이 */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}


/**
 * Abstract maple-leaf-derived polygon shapes + glow orbs.
 * No game assets — purely geometric, evoking the maple silhouette
 * through faceted triangulated shards that drift in z-space.
 */
export function HeroBackdrop() {
  const shardARef1 = useRef<SVGPolygonElement>(null);
  const shardBRef = useRef<SVGPolygonElement>(null);
  const shardCRef = useRef<SVGPolygonElement>(null);
  const shardARef2 = useRef<SVGPolygonElement>(null);
  const lineGRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Shard A1
    if (shardARef1.current) {
      animate(shardARef1.current, {
        translateY: [0, -18, 0],
        rotate: [0, 3, 0],
        scale: [1, 1.04, 1],
        opacity: [0.75, 0.95, 0.75],
        duration: 14000,
        loop: true,
        ease: "inOutQuad"
      });
    }

    // Shard B
    if (shardBRef.current) {
      animate(shardBRef.current, {
        translateY: [0, 22, 0],
        rotate: [0, -4, 0],
        scale: [1, 1.03, 1],
        opacity: [0.7, 0.9, 0.7],
        duration: 16000,
        loop: true,
        delay: 1000,
        ease: "inOutQuad"
      });
    }

    // Shard C
    if (shardCRef.current) {
      animate(shardCRef.current, {
        translateY: [0, -14, 0],
        rotate: [0, 5, 0],
        scale: [1, 1.05, 1],
        opacity: [0.75, 0.95, 0.75],
        duration: 12000,
        loop: true,
        delay: 500,
        ease: "inOutQuad"
      });
    }

    // Shard A2
    if (shardARef2.current) {
      animate(shardARef2.current, {
        translateY: [0, 16, 0],
        rotate: [0, -3, 0],
        scale: [1, 1.04, 1],
        duration: 13000,
        loop: true,
        delay: 2000,
        ease: "inOutQuad"
      });
    }

    // Lines pulsating
    if (lineGRef.current) {
      animate(lineGRef.current, {
        opacity: [0.5, 0.9, 0.5],
        duration: 8000,
        loop: true,
        ease: "inOutQuad"
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* deep ambient glows */}
      <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,111,240,0.28),transparent_70%)] blur-2xl" />
      <div className="absolute right-[-10%] top-[20%] h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,rgba(77,159,255,0.22),transparent_70%)] blur-2xl" />
      <div className="absolute left-[-8%] bottom-[-5%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,rgba(255,122,92,0.12),transparent_70%)] blur-2xl" />

      {/* faceted maple-shard polygons, drifting */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="shardA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c6ff0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4d9fff" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="shardB" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4d9fff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7c6ff0" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="shardC" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff7a5c" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#ff7a5c" stopOpacity="0" />
          </linearGradient>
        </defs>

        <polygon
          ref={shardARef1}
          points="220,120 340,80 410,200 300,280 180,230"
          fill="url(#shardA)"
          style={{ transformOrigin: "center" }}
        />
        <polygon
          ref={shardBRef}
          points="1180,260 1310,210 1360,340 1250,400 1140,360"
          fill="url(#shardB)"
          style={{ transformOrigin: "center" }}
        />
        <polygon
          ref={shardCRef}
          points="980,620 1080,580 1130,680 1040,740 950,700"
          fill="url(#shardC)"
          style={{ transformOrigin: "center" }}
        />
        <polygon
          ref={shardARef2}
          points="260,640 360,600 410,700 320,760 230,720"
          fill="url(#shardA)"
          opacity="0.7"
          style={{ transformOrigin: "center" }}
        />

        {/* fine line lattice, like a faceted gem / leaf vein structure */}
        <g ref={lineGRef} stroke="rgba(170,180,255,0.18)" strokeWidth="1">
          <line x1="220" y1="120" x2="410" y2="200" />
          <line x1="410" y1="200" x2="300" y2="280" />
          <line x1="300" y1="280" x2="220" y2="120" />
          <line x1="1180" y1="260" x2="1360" y2="340" />
          <line x1="1360" y1="340" x2="1250" y2="400" />
        </g>
      </svg>

      {/* fine grid, spatial-UI floor reference */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 30%, black, transparent)",
        }}
      />

      {/* vignette to keep focus centered */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,transparent_30%,#08090f_90%)]" />
    </div>
  );
}


