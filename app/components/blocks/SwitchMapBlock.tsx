import { Box } from "@react-three/flex";
import { useState } from "react";
import { useGameStore } from "~/store";
import type { TaggedObservable } from "~/types";
import { isTaggedObservable } from "~/utils";
import type { BallDetectionHandler } from "../BallDetector";
import { SourceBlock } from "./SourceBlock";
import { TerminalBlock } from "./TerminalBlock";
import { Center } from "@react-three/drei";
import { Base } from "./Base";

export function SwitchMapBlock(props: JSX.IntrinsicElements["group"]) {
  const removeBall = useGameStore((state) => state.removeBall);

  const [observable, setObservable] = useState<TaggedObservable | null>(null);

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (!isTaggedObservable(ball.value)) {
      throw new Error(`Expected a tagged observable, but got ${ball.value}.`);
    }
    setObservable(ball.value);
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
        {observable && (
          <Box centerAnchor>
            <SourceBlock
              source$={observable.observable$}
              text={observable.label}
            />
          </Box>
        )}
      </Box>
      <Box centerAnchor>
        <Center rotation-y={Math.PI / 2}>
          <Base block="Cube034" />
        </Center>
      </Box>
    </>
  );
}
