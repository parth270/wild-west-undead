import { useState, useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'

function CameraLogger({ event, onPositionChange } = {}) {
  const { camera } = useThree()
  const cameraRef = useRef(camera)
  const [isInPosition, setIsInPosition] = useState(false)

  useEffect(() => {
    const logCameraPosition = () => {
      const { x, y, z } = cameraRef.current.position
      const {
        x: rotationX,
        y: rotationY,
        z: rotationZ,
      } = cameraRef.current.rotation
      const roundedX = Math.round(x * 100) / 100
      const roundedY = Math.round(y * 100) / 100
      const roundedZ = Math.round(z * 100) / 100
      const roundedRotationX = Math.round(rotationX * 100) / 100
      const roundedRotationY = Math.round(rotationY * 100) / 100
      const roundedRotationZ = Math.round(rotationZ * 100) / 100

      const newPositionState =
        roundedX >= 3.2 &&
        roundedX <= 3.3 &&
        roundedY >= 0 &&
        roundedY <= 1 &&
        roundedZ >= 0.06 &&
        roundedZ <= 0.13 &&
        roundedRotationX >= -0.1 &&
        roundedRotationX <= 0.1 &&
        roundedRotationY >= -0.1 &&
        roundedRotationY <= 0.1 &&
        roundedRotationZ >= -0.1 &&
        roundedRotationZ <= 0.1

      setIsInPosition(newPositionState)

      if (onPositionChange && typeof onPositionChange === 'function') {
        onPositionChange(newPositionState)
      }

      console.log(
        `Camera position: x: ${roundedX}, y: ${roundedY}, z: ${roundedZ}`
      )
      console.log(
        `Camera rotation: x: ${roundedRotationX}, y: ${roundedRotationY}, z: ${roundedRotationZ}`
      )
    }

    cameraRef.current = camera
    window.addEventListener(event, logCameraPosition)

    return () => {
      window.removeEventListener(event, logCameraPosition)
    }
  }, [])

  return null
}

export default CameraLogger
