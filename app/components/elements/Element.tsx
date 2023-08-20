import { RigidBody, interactionGroups } from "@react-three/rapier";
import type { Model } from "~/hooks/useModel";
import { useModel } from "~/hooks/useModel";
import { CollisionGroup } from "~/utils";

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
    <group {...props}>
      <RigidBody
        type="fixed"
        colliders={support ? "cuboid" : "trimesh"}
        collisionGroups={interactionGroups(CollisionGroup.Track, [
          CollisionGroup.Ball,
        ])}
      >
        <mesh
          geometry={nodes[name].geometry}
          material={materials.Wood_Dark}
          scale={10}
          dispose={null}
        />
      </RigidBody>
    </group>
  );
}
