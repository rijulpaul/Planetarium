import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import { TextureLoader } from "three"

export default function Planet({name,props}) {
    const texture = useLoader(TextureLoader,`/textures/${name.toLowerCase()}.jpg`)
    const meshRef = useRef<THREE.Mesh>(null!)
    const angleRef = useRef<number>(0)

    useFrame((_, delta) => {
        // rotation
        if (props.rotation != 0) {
            const rotationSpeed = (2 * Math.PI) / (props.rotation * 3600);
            meshRef.current.rotation.y += rotationSpeed * delta * 1000;
        } 

        // revolution
        if (props.orbitalVel != 0) {
            const omega = props.orbitalVel / props.distance * 0.00005;
            angleRef.current += omega * delta * (1/(0.00005*0.00005));
            const x = Math.cos(angleRef.current) * props.distance * 0.00005;
            const z = Math.sin(angleRef.current) * props.distance * 0.00005;
            meshRef.current.position.set(x,0,z)
        }
    }) 

    return (
    <mesh ref={meshRef} scale={[props.size*0.01]*3} position={[props.distance*0.00005,0,0]}>
        <sphereGeometry args={[1,16,16]}/>
        <meshStandardMaterial map={texture}/>
    </mesh>
    )
}
