import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, Environment } from '@react-three/drei';
import planetData from "../../utils/planet-data";
import { PerspectiveCamera } from "@react-three/drei";

import './space.css'
import Planet from "../../components/planet";

export default function Space() {
    return (
        <div className="space">
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    near={0.1}
                    far={999999999}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[2000, 0, 20000]}
                    fov={30}
                />
                <Environment background files="../../../public/space_spheremap_8k.jpg"/>
                <ambientLight intensity={1.4}/>
                { Object.entries(planetData).map(([name,data])=><Planet name={name} data={data} />) }
                <OrbitControls zoomSpeed={0.5} rotateSpeed={0.3} panSpeed={2} dampingFactor={0.035}/>
                <Stats/>
            </Canvas>
        </div>
    )
}
