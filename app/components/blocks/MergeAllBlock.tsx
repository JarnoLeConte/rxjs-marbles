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
  const [blocks, setBlocks] = useState<{ label: string; producer: Producer }[]>(
    []
  );

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (ball.content.type !== "observable") {
      throw new Error(`Expected an observable, but got ${ball.content.type}.`);
    }

    // Modify the ticks inside the producer to start counting from the current tick
    const block = {
      label: `${ball.content.label}-${blocks.length + 1}`,
      producer: mapKeys(ball.content.producer, (t) => tick + t),
    };

    // Add the producer to the list of blocks
    setBlocks((blocks) => [...blocks, block]);

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
        {blocks.map(({ label, producer }, index) => (
          <Box centerAnchor key={index}>
            <SourceBlock producer={producer} text={label} />
          </Box>
        ))}
      </Box>
      <Box centerAnchor>
        <Base block="Cube034" rotation-y={Math.PI / 2} />
      </Box>
    </>
  );
}
