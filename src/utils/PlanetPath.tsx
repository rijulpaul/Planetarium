import { Line2, LineGeometry, LineMaterial } from "three/examples/jsm/Addons.js";
import * as THREE from "three"
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

function PlanetPath({ radius = 2, segments = 128, color = "orange", width = 0.01 }) {
  const ref = useRef();
  const { size, camera } = useThree();

  useEffect(() => {
    const positions = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      positions.push(radius * Math.cos(theta), 0, radius * Math.sin(theta));
    }

    const geometry = new LineGeometry();
    geometry.setPositions(positions);

    const material = new LineMaterial({
      color: new THREE.Color(color),
      linewidth: width, // in world units by default, will scale to screen-space
      resolution: new THREE.Vector2(size.width, size.height),
      side: THREE.DoubleSide,
    });

    const line = new Line2(geometry, material);
    line.computeLineDistances();
    line.frustumCulled = false;

    ref.current.add(line);

    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [radius, segments, color, width, size]);

  return <group ref={ref}  />;
}

export default PlanetPath;
