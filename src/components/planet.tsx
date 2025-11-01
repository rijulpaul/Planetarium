import { useRef, useState, forwardRef } from "react"

import { TextureLoader, Vector3, Mesh, Object3D } from "three"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { Text, Billboard } from "@react-three/drei"

import gsap from "gsap"

import OrbitLine from "./OrbitLine"
import PlanetRing from "./PlanetRing"

import presets from "../utils/planetPresets"
import type { Planet as BasePlanet } from "../utils/planetData"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { getPositions, getRotations } from "../utils/planetUtils"
import { degToRad } from "three/src/math/MathUtils.js"
import { useTime } from "../store/useTime"
import { useTimeSlide } from "../store/useTimeSlide"

type PlanetConfig = BasePlanet & { rotation: { period: number; tilt: number } };

interface PlanetProps {
  name: string;
  data: PlanetConfig;
  controller?: React.RefObject<OrbitControlsImpl | null>;
}

export default function Planet({ name, data: planet, controller }: PlanetProps) {

  const planetTexture = useLoader(TextureLoader, `/textures/${name.toLowerCase()}.jpg`)
  const ringPath = planet.ring ?  `/textures/${name.toLowerCase()}ring.png` : '/fallback.png';
  const ringTexture = useLoader(TextureLoader,ringPath)

  const planetRef = useRef<Mesh | null>(null)
  const billboardRef = useRef<Object3D | null>(null)

  const camera = useThree((scene)=>scene.camera)

  const time = useTime(state=>state.time)
  const setTimeScale = useTimeSlide(state=>state.updateIndex)
  const live = useTime(state=>state.live)
  const setLive = useTime(state=>state.updateLive)

  function focusCamera() {
    setTimeScale(27)
    if (live) setLive()

    if (!controller?.current || !planetRef?.current) return;

    const controls = controller.current as OrbitControlsImpl;
    const cam = controls.object;
    const target = controls.target;
    const newTarget = planetRef.current.position.clone();

    const dir = new Vector3()
      .subVectors(cam.position, target)
      .normalize();

    const newPos = newTarget.clone().addScaledVector(dir, planet.radius*0.0001*10);

    gsap.to(target, {
      x: newTarget.x,
      y: newTarget.y,
      z: newTarget.z,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => controls.update(),
    });

    gsap.to(cam.position, {
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => controls.update(),
    });

    console.log('done')
  }

  useFrame(() => {
    if (!planetRef.current || !billboardRef.current) return
    
    const date = new Date(time)
    const rotation = getRotations(date, planet.rotation.period * presets.rotationScale)
    const position = getPositions(date, planet.orbitalElements)

    planetRef.current.rotation.y = rotation
    planetRef.current.rotation.z = degToRad(planet.rotation.tilt)
    planetRef.current.position.set(
      position.x * 0.0001 * presets.distanceScale,
      position.z * 0.0001 * presets.distanceScale,
      position.y * 0.0001 * presets.distanceScale
    )

    const dist = planetRef.current.position.distanceTo(camera.position)
    billboardRef.current.scale.setScalar(dist*0.001)
  })

  const updateTime = useTime(state=>state.updateTime)

  useFrame((_,delta) => {
    updateTime(delta)
  })

  useFrame(({ camera }) => {
    if (billboardRef.current) {
      if (planetRef.current) {
        billboardRef.current.position.copy(planetRef.current.position);
      }
      billboardRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group onClick={focusCamera}>
      <mesh ref={planetRef} rotation={[0,-Math.PI/2,0]}>
        <sphereGeometry args={[planet.radius*0.0001 * presets.sizeScale, 20, 20]} />
        <meshStandardMaterial map={planetTexture}/>
        {
          planet.emission &&
            <>
              <pointLight position={[planet.radius*0.0001*4,planet.radius*0.0001*4,planet.radius*0.0001*4]} intensity={planet.emission} decay={0.1}/>
              <pointLight position={[-planet.radius*0.0001*4,-planet.radius*0.0001*4,planet.radius*0.0001*4]} intensity={planet.emission} decay={0.1}/>
              <pointLight position={[-planet.radius*0.0001*4,planet.radius*0.0001*4,-planet.radius*0.0001*4]} intensity={planet.emission} decay={0.1}/>
              <pointLight position={[planet.radius*0.0001*4,-planet.radius*0.0001*4,-planet.radius*0.0001*4]} intensity={planet.emission} decay={0.1}/>
            </>
        }
        { planet.ring &&
          <PlanetRing
            innerRadius={ planet.ring.inner * 0.0001 * presets.sizeScale }
            outerRadius={ planet.ring.outer * 0.0001 * presets.sizeScale }
            segments={48}
            radialDivs={12}
            materialProps={{
              map: ringTexture,
            }}
          />
        }
      </mesh>


    { presets.showPlanetLabel && <PlanetLabel name={name} color={planet.color} ref={billboardRef}/>}

    { (() => {
      const orbitSegments = planet.orbitalElements ? planet.orbitalElements.a * 1000 : 1000;
      return presets.showOrbitPath && (
        <OrbitLine key={name} color={planet.color || "gray"} elements={planet.orbitalElements} segments={orbitSegments} />
      );
    })() }
    </group>
  )
}

const PlanetLabel = forwardRef<Object3D, { name: string; color?: string }>(
  ({ name, color = "white" }, ref) => {
    const [lineSize, setLineSize] = useState<number>(20)
    const [hovered, setHovered] = useState(false);

    function incLineSize() {
      if (!hovered) {
        setHovered(true);
        setLineSize(lineSize + 8);
      }
    }

    function decLineSize() {
      if (hovered) {
        setHovered(false);
        setLineSize(lineSize - 8);
      }
    }

    return (
        <Billboard ref={ref} onPointerOver={incLineSize} onPointerLeave={decLineSize}>
          <Text color={color || "white"} fontSize={lineSize}>𖧋</Text>
          <Text color={color || "white"} fontSize={16} position={[0,-20,0]}>{name}</Text>
        </Billboard>
        )
}
);
