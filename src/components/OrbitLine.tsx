import * as THREE from 'three'
import { useMemo } from 'react'
import presets from '../utils/planetPresets'
import type { OrbitalElements } from '../utils/planetData'

export default function OrbitLine({ elements, color = 'gray', segments = 1000 }:{ elements: OrbitalElements | null, color?: number|string, segments?: number
}) {

  const line = useMemo(() => {
    if (!elements) return null

    const { a, e, i, Ω, ω } = elements
    const radI = THREE.MathUtils.degToRad(i)
    const radΩ = THREE.MathUtils.degToRad(Ω)
    const radω = THREE.MathUtils.degToRad(ω)

    const points: THREE.Vector3[] = []
    for (let θ = 0; θ <= 2 * Math.PI; θ += (2 * Math.PI) / segments) {
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(θ))
      points.push(new THREE.Vector3(
        r * Math.cos(θ) * 14960 * presets.distanceScale,
        r * Math.sin(θ) * 14960 * presets.distanceScale,
        0
      ))
    }

    const rot = new THREE.Matrix4()
      .makeRotationZ(radΩ)
      .multiply(new THREE.Matrix4().makeRotationX(radI))
      .multiply(new THREE.Matrix4().makeRotationZ(radω))

    points.forEach(p => p.applyMatrix4(rot))

    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [elements, segments])

  if (!elements || !line) return null

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={new THREE.Line(line, new THREE.LineBasicMaterial({ color }))} />
    </group>
  )
}
