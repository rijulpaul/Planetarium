import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from '@react-three/drei';

import './space.css'
import Planet from "../../components/planet";
import { plane } from "three/examples/jsm/Addons.js";

export default function Space() {
    const Planets = {
        Mercury: {
            size: 0.4,
            distance: 0.39,
            mesh: null,
            path: { mesh: null, gmtry: null, curve: null },
            rotation: 0,
            orbitalVel: 0.0473,
        },
        Venus: {
            size: 0.9,
            distance: 0.72,
            mesh: null,
            path: { mesh: null, gmtry: null, curve: null },
            rotation: 0,
            orbitalVel: 0.0186,
        },
        Earth: {
            size: 1,
            distance: 1,
            mesh: null,
            path: { mesh: null, gmtry: null, curve: null },
            rotation: 0,
            orbitalVel: 0.0114,
        },
        Mars: {
            size: 0.5,
            distance: 1.52,
            mesh: null,
            path: { mesh: null, gmtry: null, curve: null },
            rotation: 0,
            orbitalVel: 0.0061,
        },
        Jupiter: {
            size: 11,
            distance: 5.2,
            mesh: null,
            path: { mesh: null, gmtry: null, curve: null },
            rotation: 0,
            orbitalVel: 0.00096,
        },
        Saturn: {
            size: 9.4,
            distance: 9.6,
            mesh: null,
            path: { mesh: null, gmtry: null, curve: null },
            rotation: 0,
            orbitalVel: 0.00039,
        },
        Uranus: {
            size: 4,
            distance: 19.2,
            mesh: null,
            path: { mesh: null, gmtry: null, curve: null },
            rotation: 0,
            orbitalVel: 0.00014,
        },
        Neptune: {
            size: 3.9,
            distance: 30.7,
            mesh: null,
            path: { mesh: null, gmtry: null, curve: null },
            rotation: 0,
            orbitalVel: 0.000069,
        },
    };

    return (
        <div className="space">
            <Canvas>
                <ambientLight intensity={1}/>
                { Object.entries(Planets).map(([name,planet])=><Planet name={name} size={planet.size} distance={planet.distance}/>) }
                <OrbitControls/>
                <Stats/>
            </Canvas>
        </div>
    )
}
