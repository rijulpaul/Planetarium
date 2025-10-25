import RingSectorUVs from "./TriUVRing"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { DoubleSide, RepeatWrapping, TextureLoader } from "three"
import presets from "../utils/presets"
import planetData from "../utils/planet-data"
import getPositions from "../utils/planet-position"
import getRotations from "../utils/planet-rotation"
import { Text, Billboard } from "@react-three/drei"

export default function Planet({ name, data }) {
  const planetTexture = useLoader(TextureLoader, `/textures/${name.toLowerCase()}.jpg`)

  const ringTexture = planetData[name].ring && useLoader(TextureLoader, `/textures/${name.toLowerCase()}ringcolor.jpg`)

  const groupRef = useRef(null)
  const billboardRef = useRef(null)

  const camera = useThree((state) => state.camera)
  const sunSize = planetData.sun.size;

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
      position.x * 0.0005,
      position.z * 0.0005,
      position.y * 0.0005
    )

    // Billboard text scale
    const dist = billboardRef.current.position.distanceTo(camera.position)
    billboardRef.current.scale.setScalar(dist * 0.002)
  })

  return (
    <group onClick={printPosition} ref={groupRef}>
      <mesh scale={[data.size * 0.01, data.size * 0.01, data.size * 0.01]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshToonMaterial map={planetTexture} />
      </mesh>

      { data.ring &&
          <RingSectorUVs
  innerRadius={data.ring.inner}
  outerRadius={data.ring.outer}
  segments={12}
  materialProps={{
    map: ringTexture,        // if you want a texture
    metalness: 0,
    roughness: 0.5,
  }}
  />
      }

      <Billboard ref={billboardRef} static={false}>
        <Text color="white" fontSize={10}>-</Text>
      </Billboard>
    </group>
  )
}
