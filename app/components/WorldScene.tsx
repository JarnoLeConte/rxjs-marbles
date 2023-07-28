import { useEffect } from "react";
import { Balls } from "./Balls";
import { ForwardBlock } from "./blocks/ForwardBlock";
import { OperatorBlock } from "./blocks/OperatorBlock";
import { SinkBlock } from "./blocks/SinkBlock";
import { SourceBlock } from "./blocks/SourceBlock";
import { useGameStore } from "~/store";

export function WorldScene() {
  const addBall = useGameStore((state) => state.addBall);

  // Create an initial ball
  useEffect(() => {
    addBall({ value: 2, position: [-6.05, 1, 0] });
  }, [addBall]);

  return (
    <group>
      <Balls />
      <SourceBlock position={[-6, 0, 0]} />
      <ForwardBlock position={[-4, 0, 0]} />
      <ForwardBlock position={[-2, 0, 0]} />
      <OperatorBlock position={[0, 0, 0]} />
      <ForwardBlock position={[2, 0, 0]} />
      <SinkBlock position={[4, 0, 0]} />
    </group>
  );
}
