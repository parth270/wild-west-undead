import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function WildWestTown() {
  const { camera } = useThree()
  // console.log(camera.position,"camera-position");
  // console.log(camera.rotation,"camera-rotation");
  // const gltf = useGLTF('/assets/wwu4.glb')
  // const gltf = useGLTF('/assets/wwu_scene-v1.glb')
  // const gltf = useGLTF('/assets/scene_set6-v1.glb')
  const gltf = useGLTF('/assets/scene_set7-v1.glb')
  // const gltf = useGLTF('/assets/ww2.glb')

  return <primitive object={gltf.scene} scale={0.1} />
}
