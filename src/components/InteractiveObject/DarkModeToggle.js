import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import { useTrail } from '@react-spring/three';
import LoadingScreen from './Layout/LoadingScreen';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import WildWestTown from './Environment/WildWestTown';

function LightsController({ darkMode, sunPosition, ambientIntensity, pointIntensity }) {
  useFrame(() => {
    sunPosition.start({ to: darkMode ? [-10, -5, -10] : [0, 5, 10] });
    ambientIntensity.start({ to: darkMode ? 0.2 : 0.5 });
    pointIntensity.start({ to: darkMode ? 0.5 : 1 });
  });

  return null;
}

function SimpleScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/assets/wildwest.glb', () => {
      setIsLoading(false);
    });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [{ sunPosition, ambientIntensity, pointIntensity }] = useTrail(1, () => ({
    sunPosition: darkMode ? [-10, -5, -10] : [0, 5, 10],
    ambientIntensity: darkMode ? 0.2 : 0.5,
    pointIntensity: darkMode ? 0.5 : 1,
    config: { tension: 100, friction: 20 },
  }));

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', visibility: isLoading ? 'hidden' : 'visible' }}>
        <Sky sunPosition={sunPosition} />
        <Stars />
        <ambientLight intensity={ambientIntensity} />
        <pointLight position={[10, 10, 10]} intensity={pointIntensity} />
        <Suspense fallback={null}>
          <WildWestTown />
          <LightsController darkMode={darkMode} sunPosition={sunPosition} ambientIntensity={ambientIntensity} pointIntensity={pointIntensity} />
          <mesh onClick={toggleDarkMode} position={[0, 1, -5]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={darkMode ? 'gray' : 'blue'} />
          </mesh>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default SimpleScene;
