//IF YOU CAN'T SEE RECENTLY ADDED MODELS THE INTERACTIVE
//SPHERE IS BLOCKING IT, TRY TO RELOAD -
//IF STILL NOT WORKING TURN ON THE SPHERE OPACITY TO TROUBLESHOOT

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'

const TargetModel = ({ position, rotation, onClick }) => {
  const { scene } = useGLTF('/assets/Torus.glb')
  const copiedScene = useMemo(() => scene.clone(true), [scene])

  const spotLightRef = useRef()
  const meshRef = useRef()
  const sphereRef = useRef()

  const [isHovered, setIsHovered] = useState(false)
  const [isPointerDown, setIsPointerDown] = useState(false)
  const [previousScale, setPreviousScale] = useState({ x: 1, y: 1, z: 1 })

  const toggleHover = useCallback(() => {
    setIsHovered((prevIsHovered) => !prevIsHovered)
  }, [])

  const handlePointerDown = useCallback(() => {
    setIsPointerDown(true)
    setPreviousScale({
      x: meshRef.current.scale.x,
      y: meshRef.current.scale.y,
      z: meshRef.current.scale.z,
    })
    gsap.to(meshRef.current.scale, {
      x: 0.6,
      y: 0.6,
      z: 0.6,
      duration: 0.3,
    })
  }, [])

  const handlePointerUp = useCallback(() => {
    setIsPointerDown(false)
    gsap.to(meshRef.current.scale, {
      x: previousScale.x,
      y: previousScale.y,
      z: previousScale.z,
      duration: 0.3,
    })
  }, [previousScale])

  useEffect(() => {
    if (spotLightRef.current && copiedScene) {
      spotLightRef.current.target = copiedScene
    }
  }, [copiedScene])

  useEffect(() => {
    if (isHovered || isPointerDown) {
      gsap.to(meshRef.current.scale, {
        x: isPointerDown ? 0.6 : 0.8,
        y: isPointerDown ? 0.6 : 0.8,
        z: isPointerDown ? 0.6 : 0.8,
        duration: 0.3,
      })
    } else {
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
      })
    }
  }, [isHovered, isPointerDown])

  return (
    <>
      <group position={position} rotation={rotation}>
        <mesh ref={meshRef}>
          <primitive
            object={copiedScene}
            rotation={[1.6, 3.1, 1.2]}
            scale={0.03}
          />
        </mesh>
        <mesh
          ref={sphereRef}
          onClick={onClick}
          onPointerOver={toggleHover}
          onPointerOut={toggleHover}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}>
          <sphereGeometry args={[0.056, 12, 12]} />
          <meshStandardMaterial color='blue' opacity={0} transparent />
        </mesh>
      </group>
    </>
  )
}

export default TargetModel
