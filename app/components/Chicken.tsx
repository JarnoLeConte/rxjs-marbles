/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 ./Chicken.glb --transform --keepnames --keepmeshes --types --simplify
*/

import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["Cube035_Cube034-Mesh"]: THREE.Mesh;
    ["Cube035_Cube034-Mesh_1"]: THREE.Mesh;
    ["Cube035_Cube034-Mesh_2"]: THREE.Mesh;
    ["Cube035_Cube034-Mesh_3"]: THREE.Mesh;
    ["Cube035_Cube034-Mesh_4"]: THREE.Mesh;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
  };
};

export function Chicken(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/Chicken-transformed.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={0.0084}>
        <mesh
          name="Cube035_Cube034-Mesh"
          geometry={nodes["Cube035_Cube034-Mesh"].geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          name="Cube035_Cube034-Mesh_1"
          geometry={nodes["Cube035_Cube034-Mesh_1"].geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          name="Cube035_Cube034-Mesh_2"
          geometry={nodes["Cube035_Cube034-Mesh_2"].geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          name="Cube035_Cube034-Mesh_3"
          geometry={nodes["Cube035_Cube034-Mesh_3"].geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          name="Cube035_Cube034-Mesh_4"
          geometry={nodes["Cube035_Cube034-Mesh_4"].geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Chicken-transformed.glb");
