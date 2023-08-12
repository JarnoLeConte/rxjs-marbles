/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 ./Plumbob.glb --transform --keepnames --keepmeshes
Author: Uriel Bromberg (https://sketchfab.com/UrielBromberg)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/the-sims-plumbob-96c975f02acb41d3b8e485db8ecffd3b
Title: The Sims: Plumbob
*/

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import type { Status } from "~/types";

export type Model = GLTF & {
  nodes: {
    Plumbob_Material001_0: THREE.Mesh;
  };
  materials: {
    "Material.001": THREE.MeshPhysicalMaterial;
  };
};

export function Plumbob({
  status,
  ...props
}: JSX.IntrinsicElements["group"] & {
  status: Status;
}) {
  const { nodes, materials } = useGLTF("/Plumbob-transformed.glb") as Model;

  // Do not share material between instances
  const customMaterials = useMemo(() => {
    return materials["Material.001"].clone();
  }, [materials]);

  return (
    <group {...props}>
      <group name="Sketchfab_Scene" scale={0.002}>
        <group
          name="RootNode"
          position={[-4.756, 0.001, -2.989]}
          rotation={[-Math.PI, -0.715, -Math.PI]}
        >
          <group name="Plumbob" rotation={[-Math.PI / 2, 0, 1.486]} scale={100}>
            <mesh
              name="Plumbob_Material001_0"
              geometry={nodes.Plumbob_Material001_0.geometry}
              material={customMaterials}
              material-opacity={status === "active" ? 1 : 0.2}
              material-transparent
              dispose={null}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Plumbob-transformed.glb");
