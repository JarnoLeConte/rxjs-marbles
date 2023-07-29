import { Box, Flex } from "@react-three/flex";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useGameStore } from "~/store";
import type { BallContent } from "~/types";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { MapOperatorBlock } from "../blocks/MapOperatorBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

export function MapOperatorDemo() {
  const addBall = useGameStore((state) => state.addBall);
  const tick = useGameStore((state) => state.tick);

  const sourceRef = useRef<THREE.Group>(null!);

  // Create an an ball every tick
  useEffect(() => {
    if (tick === 0) return;

    const content: BallContent = { type: "number", value: tick };
    const position = sourceRef.current
      .localToWorld(new Vector3(-0.05, 0, 0))
      .toArray();

    addBall({ content, position });
  }, [addBall, tick]);

  const mapOperation = (content: BallContent): BallContent => {
    switch (content.type) {
      case "number":
        return { type: "number", value: 10 * content.value };
      default:
        throw new Error(
          `At the moment 'map' is not implemented for content type ${content.type}.`
        );
    }
  };

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
        <MapOperatorBlock text="map((x) => 10 * x)," operation={mapOperation} />
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
