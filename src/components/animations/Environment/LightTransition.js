import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import LoadingScreen from '../../Layout/LoadingScreen' // Updated import path
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import WildWestTown from './WildWestTown'

function LightTransition({ darkMode }) {
  const ambientLightRef = useRef()
  const pointLightRef = useRef()

  const animateTransition = (elapsedTime) => {
    const speed = 0.05
    const targetAmbientIntensity = darkMode ? 0.2 : 0.5
    const targetPointIntensity = darkMode ? 0.5 : 1
    const targetSunPosition = darkMode ? [-10, -5, -10] : [0, 5, 10]

    if (ambientLightRef.current && pointLightRef.current) {
      ambientLightRef.current.intensity +=
        speed * (targetAmbientIntensity - ambientLightRef.current.intensity)
      pointLightRef.current.intensity +=
        speed * (targetPointIntensity - pointLightRef.current.intensity)

      const currentPosition = pointLightRef.current.position
      pointLightRef.current.position.lerp(targetSunPosition, speed)
    }
  }

  useFrame((state, delta) => {
    animateTransition(delta)
  })

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.5} />
      <pointLight ref={pointLightRef} position={[10, 10, 10]} intensity={1} />
    </>
  )
}

function Scene() {
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load('/assets/wildwest.glb', () => {
      setIsLoading(false)
    })
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          visibility: isLoading ? 'hidden' : 'visible',
        }}>
        <Sky
          sunPosition={
            pointLightRef.current
              ? pointLightRef.current.position.toArray()
              : [0, 5, 10]
          }
        />
        <Stars />
        <LightTransition darkMode={darkMode} />
        <Suspense fallback={null}>
          <WildWestTown />
          <mesh onClick={toggleDarkMode} position={[0, 1, -5]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={darkMode ? 'gray' : 'blue'} />
          </mesh>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default Scene
