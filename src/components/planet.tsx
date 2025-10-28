import { useRef, useState } from "react"

import { TextureLoader, Vector3 } from "three"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { Text, Billboard } from "@react-three/drei"

import gsap from "gsap"

import OrbitLine from "./OrbitLine"
import PlanetRing from "./PlanetRing"

import presets from "../utils/planetPresets"
import { getPositions, getRotations } from "../utils/planetUtils"

export default function Planet({ name, data: planet, controller }) {

  const planetTexture = useLoader(TextureLoader, `/textures/${name.toLowerCase()}.jpg`)
  const ringTexture = planet.ring && useLoader(TextureLoader, `/textures/${name.toLowerCase()}ring.png`)

  const groupRef = useRef(null)
  const billboardRef = useRef(null)

  const camera = useThree((scene)=>scene.camera)

  function focusCamera() {
    if (!controller?.current || !groupRef?.current) return;
  
    const cam = controller.current.object;
    const target = controller.current.target;
    const newTarget = groupRef.current.position.clone();
  
    // Direction vector from camera to target
    const dir = new Vector3()
      .subVectors(cam.position, target)
      .normalize();
  
    // Calculate new camera position at desired distance from new target
    const newPos = newTarget.clone().addScaledVector(dir, planet.radius*0.0001*10);
  
    // Animate both target and camera position
    gsap.to(target, {
      x: newTarget.x,
      y: newTarget.y,
      z: newTarget.z,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => controller.current.update(),
    });
  
    gsap.to(cam.position, {
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => controller.current.update(),
    });
  }

  useFrame(() => {
    if (!groupRef.current || !billboardRef.current) return

    const rotation = getRotations(planet.rotation.period * presets.rotationScale)
    const position = getPositions(planet.orbitalElements)

    groupRef.current.rotation.y = rotation
    groupRef.current.position.set(
      position.x * 0.0001 * presets.distanceScale,
      position.z * 0.0001 * presets.distanceScale,
      position.y * 0.0001 * presets.distanceScale
    )

    // Billboard text scale
    const dist = groupRef.current.position.distanceTo(camera.position)
    billboardRef.current.scale.setScalar(dist*0.001)
  })

  return (
    <>
    <group onClick={focusCamera} ref={groupRef}>
      <mesh>
        <sphereGeometry args={[planet.radius*0.0001 * presets.sizeScale, 16, 16]} />
        <meshStandardMaterial map={planetTexture} />
      </mesh>

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

      { presets.showPlanetLabel && <PlanetLabel name={name} color={planet.color} ref={billboardRef}/>}

    </group>

    { presets.showOrbitPath && <OrbitLine key={name} color={planet.color || "gray"} elements={planet.orbitalElements} segments={planet.distance/100000} /> }
    </>
  )
}

function PlanetLabel({name, color="white", ref}) {
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
