import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useThree, useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Object_7001: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    ["hero_texture.001"]: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | "Armature|mixamo.com|Layer0"
  | "excited"
  | "laughing"
  | "sad"
  | "shrug"
  | "shrug.001"
  | "thinking.001";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const theModel = useRef<THREE.SkinnedMesh>();
  const { nodes, materials, animations } = useGLTF(
    "/sadrobot.gltf"
  ) as GLTFResult;
  const { actions, mixer } = useAnimations<THREE.AnimationClip>(
    animations,
    group
  );

  const { camera } = useThree();

  useFrame(() => {
    if (theModel.current) {
      // Get the bounding box of the model
      const boundingBox = new THREE.Box3().setFromObject(theModel.current);

      // Get the size of the bounding box
      const modelSize = new THREE.Vector3();
      boundingBox.getSize(modelSize);

      // Calculate the desired distance between the camera and the model based on the size of the bounding box
      const desiredDistance = modelSize.length() * 3;

      // Get the center of the bounding box
      const modelCenter = new THREE.Vector3();
      boundingBox.getCenter(modelCenter);

      const yOffset = 50; // Adjust this value as needed
      const cameraPosition = modelCenter
        .clone()
        .add(new THREE.Vector3(0, modelSize.y / 2 + yOffset, desiredDistance));

      const adjustedModelCenter = modelCenter
        .clone()
        .add(new THREE.Vector3(0, yOffset, 0));

      camera.position.lerp(cameraPosition, 0.05);
      camera.lookAt(adjustedModelCenter);
    }
  });

  React.useEffect(() => {
    mixer.stopAllAction();
    if (props.mood === "NEGATIVE") {
      actions.sad.play();
    } else if (props.mood === "POSITIVE") {
      actions.excited.play();
    } else if (props.mood === "NEUTRAL") {
      actions["shrug.001"].play();
    } else if (props.mood === "MIXED") {
      actions["thinking.001"].play();
    }
  }, [props.mood]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature001"
          position={[0.28, 2.35, -2.32]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            ref={theModel}
            name="Object_7001"
            geometry={nodes.Object_7001.geometry}
            material={materials["hero_texture.001"]}
            skeleton={nodes.Object_7001.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/sadrobot.gltf");
