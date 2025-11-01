import * as THREE from 'three'
import { extend, useThree } from '@react-three/fiber'
import { Line2, LineGeometry, LineMaterial} from 'three-stdlib'
import { useMemo } from 'react'

import presets from '../utils/planetPresets'

import type { OrbitalElements } from '../utils/planetData'

extend({ Line2, LineMaterial, LineGeometry })

export default function OrbitLine({ elements , linewidth = 1, color = 'gray', segments = 1000 }:{elements: OrbitalElements, linewidth: number, color: string, segments: number }) {
  const { size } = useThree()

  const { a, e, i, Ω, ω } = elements || {}

  const line = useMemo(() => {
    if (!elements) return null

    const points = []
    const radI = THREE.MathUtils.degToRad(i)
    const radΩ = THREE.MathUtils.degToRad(Ω)
    const radω = THREE.MathUtils.degToRad(ω)

    for (let θ = 0; θ <= 2 * Math.PI; θ += (2 * Math.PI) / segments) {
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(θ))
      const x = r * Math.cos(θ)
      const y = r * Math.sin(θ)
      points.push(new THREE.Vector3(x * 14960 * presets.distanceScale, y * 14960 * presets.distanceScale, 0))
    }

    points.push(points[0].clone())

    const rotMatrix = new THREE.Matrix4()
      .makeRotationZ(radΩ)
      .multiply(new THREE.Matrix4().makeRotationX(radI))
      .multiply(new THREE.Matrix4().makeRotationZ(radω))

    points.forEach(p => p.applyMatrix4(rotMatrix))

    const geometry = new LineGeometry()
    geometry.setPositions(points.flatMap(p => [p.x, p.y, p.z]))
    return geometry
  }, [elements, a, e, i, Ω, ω, segments])

  const material = useMemo(() => {
    const m = new LineMaterial({
      color,
      linewidth,
      worldUnits: false,
    })
    m.resolution.set(size.width, size.height)
    return m
  }, [size, color, linewidth])

  if (!elements || !line) return null

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} scale={[1,1,1]}>
      <line2 linewidth={linewidth} geometry={line} material={material} />
    </group>
  )
}

