import { Ball } from "./Ball";
import { ForwardBlock } from "./blocks/ForwardBlock";
import { OperatorBlock } from "./blocks/OperatorBlock";
import { StartBlock } from "./blocks/StartBlock";

export function WorldScene() {
  return (
    <group>
      <Ball position={[-4, 3, 0]} />
      <StartBlock position={[-4, -1, 0]} rotation-y={Math.PI * 0.5} />
      <ForwardBlock position={[-2, -1, 0]} />
      <OperatorBlock position={[0, 0, 0]} rotation-y={Math.PI * 0.5} />
      <ForwardBlock position={[2, -1, 0]} />
    </group>
  );
}
