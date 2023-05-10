import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useState, useEffect, Suspense } from "react";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Model from "./SadRobot/SadRobot";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Sentiment } from "../../App";
import AlertWindow from "./AlertWindow/AlertWindow";

interface Props {
  mood: Sentiment;
  tip: string;
}

const Character: React.FC<Props> = ({ mood, tip }) => {
  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <AlertWindow mood={mood} tip={tip} />
        <Canvas
          style={{
            height: "60vh",
          }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <PerspectiveCamera makeDefault />
          <Suspense fallback={null}>
            <Model mood={mood} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
};

export default Character;
