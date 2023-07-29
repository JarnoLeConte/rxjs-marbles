import { RigidBody } from "@react-three/rapier";
import type { Model } from "~/hooks/useModel";
import { useModel } from "~/hooks/useModel";
import { useReflowKey } from "~/hooks/useReflowKey";

export function Base({
  block,
  ...props
}: {
  block: keyof Model["nodes"];
} & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useModel();

  // Listen to reflow changes to reposition rigid body
  const key = useReflowKey();

  return (
    <group {...props} dispose={null}>
      <RigidBody key={key} type="fixed" colliders="trimesh">
        <mesh
          geometry={nodes[block].geometry}
          material={materials.Wood_Dark}
          scale={10}
        />
      </RigidBody>
    </group>
  );
}
