import { useSimulator } from "~/hooks/useSimulator";
import { Balls } from "./Balls";
import { ForwardBlock } from "./blocks/ForwardBlock";
import { OperatorBlock } from "./blocks/OperatorBlock";
import { SinkBlock } from "./blocks/SinkBlock";
import { SourceBlock } from "./blocks/SourceBlock";

export function WorldScene() {
  useSimulator();

  return (
    <group>
      <Balls />
      <SourceBlock position={[-6, 0, 0]} />
      <ForwardBlock position={[-4, 0, 0]} />
      <ForwardBlock position={[-2, 0, 0]} />
      <OperatorBlock position={[0, 0, 0]} />
      <ForwardBlock position={[2, 0, 0]} />
      <SinkBlock position={[4, 0, 0]} logger />
    </group>
  );
}
