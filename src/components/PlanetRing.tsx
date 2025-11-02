import { useMemo } from "react";
import * as THREE from "three";

export default function PlanetRing({
  innerRadius = 0.8,
  outerRadius = 1.2,
  segments = 4,
  radialDivs = 16,     // controls radial tessellation for smooth curvature
  position = [0, 0, 0] as [number, number, number],
  materialProps = {},
  ...props
}) {
  const geometry = useMemo(() => {
    const pos = [];
    const normal = [];
    const uv = [];
    const indices = [];

    const thetaStep = (2 * Math.PI) / segments;
    let vertOffset = 0;

    for (let s = 0; s < segments; s++) {
      const theta0 = s * thetaStep;
      const theta1 = (s + 1) * thetaStep;

      // vertices per segment
      for (let i = 0; i <= radialDivs; i++) {
        const v = i / radialDivs;
        const r = THREE.MathUtils.lerp(innerRadius, outerRadius, v);

        // two angular edges of the sector
        const x0 = Math.cos(theta0) * r;
        const y0 = Math.sin(theta0) * r;
        const x1 = Math.cos(theta1) * r;
        const y1 = Math.sin(theta1) * r;

        pos.push(x0, y0, 0, x1, y1, 0);
        normal.push(0, 0, 1, 0, 0, 1);

        // curved UV mapping — respects angular symmetry
        uv.push(0, v, 1, v);
      }

      // indices for triangles in this sector
      for (let i = 0; i < radialDivs; i++) {
        const a = vertOffset + i * 2;
        const b = a + 1;
        const c = a + 3;
        const d = a + 2;

        indices.push(a, b, d, b, c, d);
      }

      vertOffset += (radialDivs + 1) * 2;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(normal, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(indices);

    return g;
  }, [innerRadius, outerRadius, segments, radialDivs]);

  return (
    <mesh geometry={geometry} position={position} rotation={[-Math.PI/2, 0, 0]} {...props}>
      <meshStandardMaterial side={THREE.DoubleSide} {...materialProps} transparent={true} />
    </mesh>
  );
}

