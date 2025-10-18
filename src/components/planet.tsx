import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { TextureLoader } from "three"
import PlanetPath from "../utils/PlanetPath"
import presets from "../utils/presets"
import getPositions from "../utils/planet-position"
import getRotations from "../utils/planet-rotation"
import { Text, Billboard } from "@react-three/drei"

export default function Planet({name,data}) {
    const texture = useLoader(TextureLoader,`/textures/${name.toLowerCase()}.jpg`)
    const meshRef = useRef(null!)
    const camera = useThree((state)=>state.camera)

    function dist(camera, meshRef) {
        console.log(camera.position.distanceTo(meshRef.current.position));
    }

    useFrame(() => {
        const rotation = getRotations(name)
        const position = getPositions(name)
        // const sunSize = planetData.sun.size;
        const sunSize = 10

        if (position.x > 0) position.x += sunSize;
        else if (position.x < 0) position.x -= sunSize;

        if (position.y > 0) position.y += sunSize;
        else if (position.y < 0) position.y -= sunSize;

        meshRef.current.rotation.y = rotation;
        meshRef.current.position.set(position.x*14960,position.z*14960,position.y*14960)
    })

    const ref = useRef()

    useFrame(() => {
        const dist = ref.current.position.distanceTo(camera.position)
    // adjust scale based on distance
        ref.current.scale.setScalar(dist * 0.001) // tweak factor
    })

    return (
    <>
    <group onClick={()=>dist(camera,meshRef)}>
    <mesh ref={meshRef} scale={[data.size*0.01]*3} position={[data.distance*0.00005,0,0]}>
        <sphereGeometry args={[1,16,16]}/>
        <meshToonMaterial map={texture}/>
    </mesh>
    <Billboard ref={ref} position={meshRef.current.position} static={true} scale={10000}>
        <Text color={"white"} fontSize={10} >{name}</Text>
    </Billboard>
    { presets.showPlanetPath && <PlanetPath radius={data.distance/14900} width={0.5} color="lightgray"/> }
    </group>
    </>
    )
}
