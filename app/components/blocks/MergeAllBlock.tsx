import { Box } from "@react-three/flex";
import { useState } from "react";
import { useGameStore } from "~/store";
import type { Producer } from "~/types";
import type { BallDetectionHandler } from "../BallDetector";
import { Base } from "./Base";
import { TerminalBlock } from "./TerminalBlock";
import { mapKeys } from "~/utils";
import { SourceBlock } from "./SourceBlock";

export function MergeAllBlock(props: JSX.IntrinsicElements["group"]) {
  const tick = useGameStore((state) => state.tick);
  const removeBall = useGameStore((state) => state.removeBall);

  // Keep track of the active producers which are currently emitting balls
  // and being merged
  const [producers, setProducers] = useState<Producer[]>([]);

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (ball.content.type !== "observable") {
      throw new Error(`Expected an observable, but got ${ball.content.type}.`);
    }

    // Modify the ticks inside the producer to start counting from the current tick
    const producer = mapKeys(ball.content.producer, (t) => tick + t);

    // Add the producer to the list of producers
    setProducers((producers) => [...producers, producer]);

    // Remove icoming ball
    removeBall(ball.id);
  };

  return (
    <>
      <Box dir="column-reverse">
        <Box centerAnchor>
          <TerminalBlock
            rotation-y={Math.PI}
            onBallDetection={onBallDetection}
          />
        </Box>
        {producers.map((producer, index) => (
          <Box centerAnchor key={index}>
            <SourceBlock producer={producer} text={`${index}$`} />
          </Box>
        ))}
      </Box>
      <Box centerAnchor>
        <Base block="Cube034" rotation-y={Math.PI / 2} />
      </Box>
    </>
  );
}
