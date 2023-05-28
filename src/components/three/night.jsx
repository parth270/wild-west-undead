import React from "react";
import * as THREE from "three";
import Effects from "./effect";
import { Cloud, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
const Night = () => {
  const texture = useTexture(
    "https://media.istockphoto.com/id/1346825851/video/concept-1-u1-view-of-the-realistic-blood-moon.jpg?s=640x640&k=20&c=vC8lBGeyrHvHwdKnbLyV6Us3LF5g0307AzJ6WSSRM2s="
  );
  const texture1 = useTexture(
    "https://media.istockphoto.com/id/1032578092/video/apocalyptic-red-sky-with-sun-behind-the-clouds.jpg?s=640x640&k=20&c=LdbSBvnDnU0FxRPr2iGZ4-9oBG4W3c04zcXIRegzmKA="
  );
  const genPos = { x: 0, y: 20, z: 0 };
  const scale = [3, 3, 3];

  return (
    <>
      {/* <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[65, 100, 100]} />
        <meshBasicMaterial color={"#41100e"} side={THREE.DoubleSide} />
      </mesh> */}
      <fog color="#000" near={0.1} far={10} />
      <mesh position={[-30, 6, -36]} scale={[3.5, 3.5, 3.5]}>
        <sphereGeometry args={[3, 100, 100]} />
        <meshPhongMaterial
          //   emissive={"#801511"}
          emissive={"#ff0000"}
          emissiveIntensity={0.25}
          color={"#ff0000"}
          side={THREE.DoubleSide}
          map={texture}
        />
      </mesh>
      {/* <Cloud
        color="#000"
        speed={0.5}
        opacity={0.7}
        position={[2, genPos.y, 0]}
        scale={scale}
      /> */}
      {/* <Cloud
        color="#000"
        speed={0.5}
        opacity={1}
        position={[-2, genPos.y, -3]}
        scale={scale}
      />
      <Cloud
        color="#000"
        speed={0.5}
        opacity={0.4}
        position={[-20, genPos.y, 0]}
        scale={scale}
      />
      <Cloud
        color="#000"
        speed={0.5}
        opacity={0.11}
        position={[-20, genPos.y, -10]}
        depth={20}
        scale={scale}
      /> */}
      {/* <mesh>
        <sphereGeometry args={
            [50,100,100]
        } />
        <meshBasicMaterial color={"#fff"} side={THREE.DoubleSide}  map={texture1} />
      </mesh> */}
      <Cloud width={50} color="#000" opacity={0.7} position={[0, 9, -10]} />
      <Cloud color="#000" opacity={0.5} width={50} position={[-10, 9, 0]} />
      <Cloud color="#000" opacity={0.8} width={50} position={[-10, 15, -10]} />
      {/* <Effects /> */}
    </>
  );
};

export default Night;
