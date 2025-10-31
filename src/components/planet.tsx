import { useRef, useState } from "react"

import { TextureLoader, Vector3 } from "three"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { Text, Billboard } from "@react-three/drei"

import gsap from "gsap"

import OrbitLine from "./OrbitLine"
import PlanetRing from "./PlanetRing"

import presets from "../utils/planetPresets"
import { getPositions, getRotations } from "../utils/planetUtils"
import { degToRad } from "three/src/math/MathUtils.js"
import { useTime } from "../store/useTime"

export default function Planet({ name, data: planet, controller }) {

  const planetTexture = useLoader(TextureLoader, `/textures/${name.toLowerCase()}.jpg`)
  const ringTexture = planet.ring && useLoader(TextureLoader, `/textures/${name.toLowerCase()}ring.png`)

  const groupRef = useRef(null)
  const billboardRef = useRef(null)

  const camera = useThree((scene)=>scene.camera)

  const time = useTime(state=>state.time)

  function focusCamera() {
    if (!controller?.current || !groupRef?.current) return;
  
    const cam = controller.current.object;
    const target = controller.current.target;
    const newTarget = groupRef.current.position.clone();
  
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

    console.log(planet)
  }

  useFrame(() => {
    if (!groupRef.current || !billboardRef.current) return
    
    const date = new Date(time)
    const rotation = getRotations(date, planet.rotation.period * presets.rotationScale)
    const position = getPositions(date, planet.orbitalElements)

    groupRef.current.rotation.y = rotation
    groupRef.current.rotation.z = degToRad(planet.rotation.tilt)
    groupRef.current.position.set(
      position.x * 0.0001 * presets.distanceScale,
      position.z * 0.0001 * presets.distanceScale,
      position.y * 0.0001 * presets.distanceScale
    )

    const dist = groupRef.current.position.distanceTo(camera.position)
    billboardRef.current.scale.setScalar(dist*0.001)
  })

  const updateTime = useTime(state=>state.updateTime)

  useFrame((_,delta) => {
    updateTime(delta)
  })

  useFrame(({ camera }) => {
    billboardRef.current.position.copy(groupRef.current.position);
    billboardRef.current.quaternion.copy(camera.quaternion);
  });

  return (
    <>
    <group onClick={focusCamera} ref={groupRef}>
      <mesh rotation={[0,-Math.PI/2,0]}>
        <sphereGeometry args={[planet.radius*0.0001 * presets.sizeScale, 16, 16]} />
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


    </group>
    { presets.showPlanetLabel && <PlanetLabel name={name} color={planet.color} ref={billboardRef}/>}

    { presets.showOrbitPath && <OrbitLine key={name} color={planet.color || "gray"} elements={planet.orbitalElements} segments={planet.orbitalElements?.a*1000 || 1000} /> }
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
