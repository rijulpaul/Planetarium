import RingSectorUVs from "./TriUVRing"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { TextureLoader } from "three"
import planetData from "../utils/planet-data"
import getRotations from "../utils/planet-rotation"
import { Text, Billboard } from "@react-three/drei"
import { getPositions } from "../utils/planet-position"

export default function Planet({ name, data }) {
  const planetTexture = useLoader(TextureLoader, `/textures/${name.toLowerCase()}.jpg`)

  const ringTexture = planetData[name].ring && useLoader(TextureLoader, `/textures/${name.toLowerCase()}ring.png`)

  const groupRef = useRef(null)
  const billboardRef = useRef(null)

  const camera = useThree((state) => state.camera)
  const sunSize = planetData.sun.radius;

  function printPosition() {
    if (!groupRef.current) return
    console.log(camera.position.distanceTo(groupRef.current.position))
  }

  useFrame(() => {
    if (!groupRef.current || !billboardRef.current) return

    const rotation = getRotations(name)
    const position = getPositions(name)

    if (position.x > 0) position.x += sunSize
    else if (position.x < 0) position.x -= sunSize

    if (position.y > 0) position.y += sunSize
    else if (position.y < 0) position.y -= sunSize

    groupRef.current.rotation.y = rotation
    groupRef.current.position.set(
      position.x * 0.0001,
      position.z * 0.0001,
      position.y * 0.0001
    )

    // billboardRef.current.position.set(
    //   position.x * 0.0001,
    //   position.z * 0.0001,
    //   position.y * 0.0001
    // )

    // Billboard text scale
    const dist = groupRef.current.position.distanceTo(camera.position)
    billboardRef.current.scale.setScalar(dist*0.001)
  })

  return (
    <group onClick={printPosition} ref={groupRef}>
      <mesh>
        <sphereGeometry args={[data.radius*0.0001, 16, 16]} />
        <meshToonMaterial map={planetTexture} />
      </mesh>

      { data.ring &&
        <RingSectorUVs
          innerRadius={ data.ring.inner * 0.0001 }
          outerRadius={ data.ring.outer * 0.0001 }
          segments={40}
          radialDivs={4}
          materialProps={{
            map: ringTexture,
          }}
        />
      }

      <Billboard ref={billboardRef}>
        <Text color="white" fontSize={8}>{name}</Text>
      </Billboard>
    </group>
  )
}
