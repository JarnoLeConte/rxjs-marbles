import { RigidBody } from "@react-three/rapier";
import type { Model } from "~/hooks/useModel";
import { useModel } from "~/hooks/useModel";

export function Element({
  name,
  ...props
}: {
  name: keyof Model["nodes"];
} & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useModel();

  return (
    <group {...props} dispose={null}>
      <RigidBody type="fixed" colliders="trimesh">
        <mesh
          geometry={nodes[name].geometry}
          material={materials.Wood_Dark}
          scale={10}
        />
      </RigidBody>
    </group>
  );
}
