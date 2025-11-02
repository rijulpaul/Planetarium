import { Suspense, useEffect, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { PerspectiveCamera as PerspectiveCameraImpl } from 'three';

import gsap from "gsap";

import './space.css'

import Planet from "../../components/planet";
import usePlanetData from "../../store/usePlanetData";

function Loader() {
  const { progress } = useProgress();
  return <Html center style={{width: "100px"}}><span style={{fontSize: "40px", fontWeight: "800"}}>{progress.toFixed(0)}</span> % loaded</Html>;
}

export default function Space() {
  const controlRef = useRef<OrbitControlsImpl | null>(null)
  const planets = usePlanetData((s)=>s.planets)

  return (
    <div className="space">
      <Canvas>
        <Suspense fallback={<Loader/>}>
          <AnimatedCamera controlRef={controlRef}/>
          <Environment background files={`${import.meta.env.BASE_URL}/space_spheremap_8k.jpg`}/>
          <ambientLight intensity={0.2}/>
          { Object.entries(planets).map(([name,data])=>
            <Planet key={name} name={name} data={data} controller={controlRef} />
          )}
          <OrbitControls ref={controlRef} zoomSpeed={1} rotateSpeed={0.3} panSpeed={1} dampingFactor={0.035} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function AnimatedCamera({ controlRef }: { controlRef: React.RefObject<OrbitControlsImpl | null> }) {
  const camRef = useRef<PerspectiveCameraImpl | null>(null);

  useEffect(() => {
    if (!camRef.current) return;
    if (!controlRef.current) return;

    camRef.current.position.set(-500000, 500000, 500000);

    gsap.to(camRef.current.position, {
      x: 52000,
      y: 17000,
      z: 2500,
      duration: 3,
      ease: "power2.out",
      onUpdate: () => {
        controlRef.current?.update();
      },
    });

    gsap.to(controlRef.current.target, {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power2.out",
    });
  }, [controlRef]);

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      near={0.1}
      far={999999999}
      fov={55}
    />
  );
}
