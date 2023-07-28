import { useEffect } from "react";
import { useGameStore } from "~/store";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

export function IntervalOperatorDemo() {
  const addBall = useGameStore((state) => state.addBall);
  const tick = useGameStore((state) => state.tick);

  // Create an an ball every tick
  useEffect(() => {
    if (tick === 0) return;
    addBall({ value: tick - 1, position: [-2.05, 1, 0] });
  }, [addBall, tick]);

  return (
    <group>
      <SourceBlock position={[-2, 0, 0]} text="interval()" />
      <SinkBlock position={[0, 0, 0]} logger text=".subscribe();" />
    </group>
  );
}
