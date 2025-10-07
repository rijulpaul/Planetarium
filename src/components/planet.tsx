import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import { TextureLoader } from "three"

export default function Planet({name,props}) {
    const texture = useLoader(TextureLoader,`/textures/${name.toLowerCase()}.jpg`)
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((_, delta) => {
        if (props.rotation != 0) {
            const rotationSpeed = (2 * Math.PI) / (props.rotation * 3600);
            meshRef.current.rotation.y += rotationSpeed * delta;
        } 
    }) 

    return (
    <mesh ref={meshRef} scale={[props.size*0.01]*3} position={[props.distance*0.00005,0,0]}>
        <sphereGeometry args={[1,16,16]}/>
        <meshStandardMaterial map={texture}/>
    </mesh>
    )
}
