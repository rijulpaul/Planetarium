import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, Environment } from '@react-three/drei';
import Planets from "../../utils/planet-data";

import './space.css'
import Planet from "../../components/planet";

export default function Space() {

    return (
        <div className="space">
            <Canvas camera={{ near: 0.1, far: 999999999, position: [600,0,0], fov: 30 }}>
                <Environment background files="../../../public/space_spheremap_8k.jpg"/>
                <ambientLight intensity={0.65}/>
                <pointLight position={[0,0,0]} decay={0.1} intensity={4} color={"#ffccaa"}/>
                { Object.entries(Planets).map(([name,props])=><Planet name={name} props={props} />) }
                <OrbitControls zoomSpeed={0.5} rotateSpeed={0.3} panSpeed={2}/>
                <Stats/>
            </Canvas>
        </div>
    )
}
