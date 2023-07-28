import { Ball } from "./Ball";
import { ForwardBlock } from "./blocks/ForwardBlock";
import { OperatorBlock } from "./blocks/OperatorBlock";

export function WorldScene() {
  return (
    <group>
      <Ball position={[-2, 0, 0]} />
      <ForwardBlock position={[-2, -1, 0]} />
      <OperatorBlock rotation-y={Math.PI * 0.5} />
      <ForwardBlock position={[2, -1, 0]} />
    </group>
  );
}
