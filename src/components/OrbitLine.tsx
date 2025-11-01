import * as THREE from 'three'
import { extend, useThree } from '@react-three/fiber'
import { Line2, LineGeometry, LineMaterial } from 'three-stdlib'
import { useMemo } from 'react'
import presets from '../utils/planetPresets'
import type { OrbitalElements } from '../utils/planetData'

extend({ Line2, LineMaterial, LineGeometry })

export default function OrbitLine({ elements , linewidth = 1, color = new THREE.Color('gray').getHex(), segments = 1000 }:{ elements: OrbitalElements | null, linewidth?: number, color: number|string, segments?: number
}) {
  const { size } = useThree()

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
    points.push(points[0].clone())

    const rot = new THREE.Matrix4()
      .makeRotationZ(radΩ)
      .multiply(new THREE.Matrix4().makeRotationX(radI))
      .multiply(new THREE.Matrix4().makeRotationZ(radω))

    points.forEach(p => p.applyMatrix4(rot))

    const geo = new LineGeometry()
    geo.setPositions(points.flatMap(p => [p.x, p.y, p.z]))
    return geo
  }, [elements, segments])

  const material = useMemo(() => {
    const m = new LineMaterial({
      color: new THREE.Color(color).getHex(),
      linewidth,
      worldUnits: false
    })
    m.resolution.set(size.width, size.height)
    return m
  }, [size, color, linewidth])

  if (!elements || !line) return null

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <line2 geometry={line} material={material} />
    </group>
  )
}

