import { Box, Flex } from "@react-three/flex";
import { useEffect, useRef } from "react";
import { useGameStore } from "~/store";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { MapOperatorBlock } from "../blocks/MapOperatorBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";
import { Vector3 } from "three";

export function MapOperatorDemo() {
  const addBall = useGameStore((state) => state.addBall);
  const tick = useGameStore((state) => state.tick);

  const sourceRef = useRef<THREE.Group>(null!);

  // Create an an ball every tick
  useEffect(() => {
    if (tick === 0) return;

    const value = tick;
    const position = sourceRef.current
      .localToWorld(new Vector3(-0.05, 0, 0))
      .toArray();

    addBall({ value, position });
  }, [addBall, tick]);

  return (
    <Flex justifyContent="center" alignItems="flex-end" dir="row">
      <Box centerAnchor ref={sourceRef}>
        <SourceBlock />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <MapOperatorBlock
          text="map((x) => 10 * x),"
          operation={(x: number) => 10 * x}
        />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <SinkBlock position-y={-1.75} />
      </Box>
    </Flex>
  );
}
