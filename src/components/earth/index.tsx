import React, { useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import EarthClouds from "../../assets/textures/8k_earth_clouds.jpg";
import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";

const Earth = () => {
  const [cloudMap, colorMap, normalMap, specularMap] = useLoader(
    TextureLoader,
    [EarthClouds, EarthDayMap, EarthNormalMap, EarthSpecularMap]
  );

  const earthRef = useRef();
  const cloudRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // @ts-ignore: Unreachable code error
    earthRef.current.rotation.y = elapsedTime / 6;
    // @ts-ignore: Unreachable code error
    cloudRef.current.rotation.y = elapsedTime / 6;
  });

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <pointLight color="#F6F3EA" position={[6.5, 0, 6.5]} intensity={1.2} />
      <Stars
        radius={300}
        depth={60}
        factor={7}
        saturation={0}
        fade
        count={20000}
      />
      <mesh ref={cloudRef} scale={2.5}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudMap}
          opacity={0.4}
          depthWrite
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} scale={2.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls
          enableZoom
          enablePan
          enableRotate
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
};

export default Earth;
