import { Center } from "@react-three/drei";
import { Box } from "@react-three/flex";
import { useState } from "react";
import { delay } from "rxjs";
import { useGameStore } from "~/store";
import type { TaggedObservable } from "~/types";
import { isTaggedObservable } from "~/utils";
import { BallDetector, type BallDetectionHandler } from "../BallDetector";
import { Base } from "../Base";
import { SourceBlock } from "./SourceBlock";
import { TerminalBlock } from "./TerminalBlock";

export function MergeAllBlock(props: JSX.IntrinsicElements["group"]) {
  const removeBall = useGameStore((state) => state.removeBall);

  // Keep track of the active producers which are currently emitting balls
  // and being merged
  const [observables, setObservables] = useState<TaggedObservable[]>([]);

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (!isTaggedObservable(ball.value)) {
      throw new Error(`Expected a tagged observable, but got ${ball.value}.`);
    }
    const { observable$, label } = ball.value;

    // Modify the ticks inside the producer to start counting from the current tick
    const observable: TaggedObservable = {
      label,
      observable$: observable$.pipe(delay(observables.length * 750)),
    };

    // Add the producer to the list of blocks
    setObservables((observables) => [...observables, observable]);

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
        {observables.map(({ observable$, label }, index) => (
          <Box centerAnchor key={index}>
            <SourceBlock source$={observable$} text={label} />
          </Box>
        ))}
      </Box>
      <Box centerAnchor>
        <Center rotation-y={Math.PI / 2}>
          <Base element="Cube547" />
          <BallDetector position={[0, 2, 0]} />
        </Center>
      </Box>
      <Box centerAnchor>
        <Center rotation-y={Math.PI / 2}>
          <Base element="Cube546" />
        </Center>
      </Box>
    </>
  );
}
