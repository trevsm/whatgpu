import React, { Suspense, useRef, useState } from 'react'
import { EffectComposer, Noise } from 'react-postprocessing'
import { Canvas } from 'react-three-fiber'
import { Stats, useDetectGPU } from '@react-three/drei'

import logo from './gpu.png'
import logoSmall from './gpu-small.png'

import { useSpring, animated } from 'react-spring'
import Model from './CpuGpu'

import 'minireset.css'
import './App.css'

export default function App() {
  const [active, setActive] = useState(false)
  const type = useRef('')
  const gpu = useDetectGPU()

  const activeClass = active ? ' active' : ''

  function calculateGpu() {
    type.current = gpu?.gpu
    setActive(true)
  }
  return (
    <>
      <div className="logo">
        <img className={`title${activeClass}`} src={logoSmall} />
      </div>
      <div className="result">
        <div className={`center${activeClass}`}>
          <div className={`title${activeClass}`}>{type.current}</div>
        </div>
      </div>
      <div className="landing">
        <div className="center">
          <img className={`title${activeClass}`} src={logo} />
          <button onClick={calculateGpu} className={`${activeClass}`}>
            Calculate.
          </button>
        </div>
      </div>
      <Canvas
        camera={{ position: [0, 0.1, 0.5], fov: 60 }}
        pixelRatio={window.devicePixelRatio}
      >
        <ambientLight intensity={1} />
        <directionalLight intensity={1.5} />
        {gpu?.tier > 2 ? (
          <EffectComposer>
            <Noise opacity={0.01} />
          </EffectComposer>
        ) : null}
        <Suspense fallback={null}>
          <Model active={active} />
        </Suspense>
        <Stats />
      </Canvas>
    </>
  )
}
