import type { Model } from "~/hooks/useModel";
import { useModel } from "~/hooks/useModel";

export function Base({
  block,
  ...props
}: { block: keyof Model["nodes"] } & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useModel();

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes[block].geometry}
        material={materials.Wood_Dark}
        scale={10}
      />
    </group>
  );
}
