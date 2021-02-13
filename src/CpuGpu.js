import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'
import { useFrame } from 'react-three-fiber'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/gpu_gpu.gltf')

  const ani = useSpring({
    pos: props.active ? [0, 0, 0] : [0, -.5, 0],
    config: {
      mass: .7,
      tension: 50,
      friction: 10,
      precision: 0.0001,
    },
  })

  useFrame(({ clock }) => {
    if (props.active) {
      group.current.rotation.y = clock.elapsedTime / 3 + Math.PI / 2 - 0.5
    }
  })

  return (
    <a.group ref={group} position={ani.pos} scale={[2, 2, 2]}>
      <mesh material={materials.Metal} geometry={nodes.Chip_1.geometry} />
      <mesh material={materials.Chip} geometry={nodes.Chip_2.geometry} />
      <mesh material={materials.Edge} geometry={nodes.Chip_3.geometry} />
      <mesh material={materials.Edge} geometry={nodes.Dots.geometry} />
    </a.group>
  )
}

useGLTF.preload('/models/gpu_gpu.gltf')
