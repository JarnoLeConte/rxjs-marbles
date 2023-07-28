import { useEffect } from "react";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { OperatorBlock } from "../blocks/OperatorBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";
import { useGameStore } from "~/store";

export function MapOperatorDemo() {
  const addBall = useGameStore((state) => state.addBall);
  const tick = useGameStore((state) => state.tick);

  // Create an an ball every tick
  useEffect(() => {
    if (tick === 0) return;
    addBall({ value: tick, position: [-6.05, 1, 0] });
  }, [addBall, tick]);

  return (
    <group>
      <SourceBlock position={[-6, 0, 0]} />
      <ForwardBlock position={[-4, 0, 0]} />
      <ForwardBlock position={[-2, 0, 0]} />
      <OperatorBlock position={[0, 0, 0]} />
      <ForwardBlock position={[2, 0, 0]} />
      <SinkBlock position={[4, 0, 0]} logger />
    </group>
  );
}
