import React from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function WildWestTown() {
  const { camera } = useThree();
  // console.log(camera.position,"camera-position");
  // console.log(camera.rotation,"camera-rotation");
  const gltf = useGLTF("/assets/west2.glb");
  return <primitive object={gltf.scene} scale={0.1} />;
}
