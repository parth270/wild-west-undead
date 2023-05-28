import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import WildWestTown from './WildWestTown';
import LightTransition from './LightTransition'; // Updated import path

function Scene() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/assets/wildwest.glb', () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <ClientSideOnly>
        <SceneContent isLoading={isLoading} />
      </ClientSideOnly>
    </>
  );
}

export default Scene;
