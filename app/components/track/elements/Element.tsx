import { RigidBody } from "@react-three/rapier";
import type { Model } from "~/hooks/useModel";
import { useModel } from "~/hooks/useModel";

export function Element({
  name,
  support,
  ...props
}: {
  name: keyof Model["nodes"];
  support?: boolean; // pillar construction
} & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useModel();

  return (
    <group {...props} dispose={null}>
      <RigidBody type="fixed" colliders={support ? "cuboid" : "trimesh"}>
        <mesh
          geometry={nodes[name].geometry}
          material={materials.Wood_Dark}
          scale={10}
        />
      </RigidBody>
    </group>
  );
}
