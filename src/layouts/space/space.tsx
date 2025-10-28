import { Suspense, useEffect, useRef } from "react";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera, Stats, Html, useProgress } from '@react-three/drei';

import gsap from "gsap";

import './space.css'

import Planet from "../../components/planet";

function Loader() {
  const { progress } = useProgress();
  return <Html center style={{width: "100px"}}><span style={{fontSize: "40px", fontWeight: "800"}}>{progress.toFixed(0)}</span> % loaded</Html>;
}

export default function Space({planets}) {
    const controlRef = useRef(null)

    return (
        <div className="space">
            <Canvas>
                <Suspense fallback={<Loader/>}>
                <AnimatedCamera controlRef={controlRef}/>
                <Environment background files="/space_spheremap_8k.jpg"/>
                <pointLight intensity={2.5} decay={0.1}/>
                <ambientLight intensity={0.1}/>
                { Object.entries(planets).map(([name,data])=><Planet name={name} data={data} controller={controlRef} />) }
                <OrbitControls ref={controlRef} zoomSpeed={0.5} rotateSpeed={0.3} panSpeed={1} dampingFactor={0.035} maxDistance={1000000}/>
                <Stats/>
                </Suspense>
            </Canvas>
        </div>
    )
}

function AnimatedCamera({ controlRef }) {
  const camRef = useRef();

  useEffect(() => {
    if (!camRef.current) return;

    // set initial camera pos
    camRef.current.position.set(-500000, 500000, 500000);

    // animate to target position
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

    // optionally animate the orbit target
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
      fov={60}
    />
  );
}
