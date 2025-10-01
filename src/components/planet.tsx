import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

type PlanetProps = {
    size: number,
    distance: number,
    name: string,
}

export default function Planet({name,size,distance}: PlanetProps) {
    // const texture = useLoader(TextureLoader,'/marsmap1k.jpg')
    const texture = useLoader(TextureLoader,`/textures/${name.toLowerCase()}.jpg`)

    // add quality presets 8, 12, 20

    return (
    <mesh scale={[size,size,size]} position={[distance*10,0,0]}>
        <sphereGeometry args={[1,20,20]}/>
        <meshStandardMaterial map={texture}/>
    </mesh>
    )
}
