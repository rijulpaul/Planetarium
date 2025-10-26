import { useMemo } from 'react';
import { sampleOrbit } from '../utils/planet-position';

export default function OrbitLine({ elements, date = new Date(), color = 'white', segments = 720, scale = 1 }) {
  // elements: same shape as your positionData entry
  const positions = useMemo(() => {
    const pts = sampleOrbit(elements, date, segments);
    const arr = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      arr[3 * i + 0] = pts[i].x * scale;
      arr[3 * i + 1] = pts[i].y * scale;
      arr[3 * i + 2] = pts[i].z * scale;
    }
    return arr;
  }, [elements, date, segments, scale]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} linewidth={1} />
    </line>
  );
}

