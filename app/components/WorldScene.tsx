import { useEffect } from "react";
import { useGameStore } from "~/store";
import { Balls } from "./Balls";
import { ForwardBlock } from "./blocks/ForwardBlock";
import { OperatorBlock } from "./blocks/OperatorBlock";
import { SinkBlock } from "./blocks/SinkBlock";
import { SourceBlock } from "./blocks/SourceBlock";

export function WorldScene() {
  const addBall = useGameStore((state) => state.addBall);

  // Create an initial ball
  useEffect(() => {
    addBall({ value: 2, position: [-6.05, 1, 0] });

    // delayed
    setTimeout(() => {
      addBall({ value: 5, position: [-6.05, 1, 0] });
    }, 4000);

    // delayed
    setTimeout(() => {
      addBall({ value: 8, position: [-6.05, 1, 0] });
    }, 8000);
  }, [addBall]);

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
