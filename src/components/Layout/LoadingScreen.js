import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OrbitControls, Html, useProgress, PerspectiveCamera } from '@react-three/drei';

function Model() {
  const gltf = useLoader(GLTFLoader, '/assets/wwu3d2.glb');
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[300, 300, 300]}
    />
  );
}

const LoadingScreen = () => {
  const { progress } = useProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white">
      <Canvas>
        <PerspectiveCamera makeDefault position={[70, 50, 10]} />
        <color attach="background" args={['#ffffff']} />
        <fog attach="fog" args={['#111111', 10, 100]} />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[2, 10, 5]}
          intensity={1}
          color={'#f9930a'}
        />
        <spotLight
          color={0xffffff}
          intensity={5}
          position={[25, 50, 25]}
          angle={Math.PI / 6}
          penumbra={1}
          decay={2}
          distance={100}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={10}
          shadow-camera-far={200}
          shadow-focus={1}
        />
        <Model />
        <OrbitControls />
      </Canvas>
      <div className="absolute">
        <h1
          className="text-black text-lg font-bold mb-2"
          style={{ fontFamily: 'your-font-family' }}
        >
          Loading...
        </h1>
        <div className="w-64 h-4 bg-gray-300 rounded">
          <div
            className="h-4 bg-blue-500 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;