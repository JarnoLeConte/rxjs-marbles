import { Box, Flex } from "@react-three/flex";
import { useEffect, useRef } from "react";
import { Vector3, type Group } from "three";
import { useGameStore } from "~/store";
import type { BallContent } from "~/types";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

export function IntervalOperatorDemo() {
  const addBall = useGameStore((state) => state.addBall);
  const tick = useGameStore((state) => state.tick);

  const sourceRef = useRef<Group>(null!);

  // Create an an ball every tick
  useEffect(() => {
    if (tick === 0) return;

    const content: BallContent = { type: "number", value: tick - 1 };
    const position = sourceRef.current
      .localToWorld(new Vector3(-0.05, 0, 0))
      .toArray();

    addBall({ content, position });
  }, [addBall, tick]);

  return (
    <Flex justifyContent="center" alignItems="flex-end" dir="row">
      <Box centerAnchor ref={sourceRef}>
        <SourceBlock text="interval()" />
      </Box>
      <Box centerAnchor>
        <SinkBlock position-y={-1.75} text=".subscribe(...);" />
      </Box>
    </Flex>
  );
}
