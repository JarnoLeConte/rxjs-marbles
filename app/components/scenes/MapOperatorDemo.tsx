import { useEffect } from "react";
import { useGameStore } from "~/store";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { MapOperatorBlock } from "../blocks/MapOperatorBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

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
      <MapOperatorBlock
        position={[0, 0, 0]}
        text="map((x) => 10 * x),"
        operation={(x: number) => 10 * x}
      />
      <ForwardBlock position={[2, 0, 0]} />
      <SinkBlock position={[4, 0, 0]} />
    </group>
  );
}
