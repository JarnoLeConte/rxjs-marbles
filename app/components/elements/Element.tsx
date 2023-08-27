import { RigidBody, interactionGroups } from "@react-three/rapier";
import type { Model } from "~/hooks/useModel";
import { useModel } from "~/hooks/useModel";
import { CollisionGroup } from "~/utils";
import { useTrackTheme } from "../TrackThemeProvider";
import { useMemo } from "react";

export function Element({
  name,
  support,
  ...props
}: {
  name: keyof Model["nodes"];
  support?: boolean; // pillar construction
} & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useModel();
  const { color } = useTrackTheme();

  // TODO: improve performance by caching and sharing materials
  const material = useMemo(() => {
    if (!color) return materials["Wood_Dark"];
    const material = materials["Wood_Dark"].clone();
    material.color.set(color.toString());
    return material;
  }, [materials, color]);

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
          material={material}
          scale={10}
          dispose={null}
        />
      </RigidBody>
    </group>
  );
}
