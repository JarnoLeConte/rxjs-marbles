import { Center } from "@react-three/drei";
import { Box } from "@react-three/flex";
import { useState } from "react";
import { finalize } from "rxjs";
import { useGameStore } from "~/store";
import type { TaggedObservable } from "~/types";
import { isTaggedObservable } from "~/utils";
import type { BallDetectionHandler } from "../BallDetector";
import { Base } from "./Base";
import { SourceBlock } from "./SourceBlock";
import { TerminalBlock } from "./TerminalBlock";

export function ConcatAllBlock(props: JSX.IntrinsicElements["group"]) {
  const removeBall = useGameStore((state) => state.removeBall);

  // Keep track of the active producers which are currently emitting balls
  // and being merged
  const [observables, setObservables] = useState<TaggedObservable[]>([]);

  const addObservable = (observable: TaggedObservable) => {
    setObservables((observables) => [...observables, observable]);
  };

  const removeObservable = (observable: TaggedObservable) => {
    setObservables((observables) =>
      observables.filter((o) => o !== observable)
    );
  };

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (!isTaggedObservable(ball.value)) {
      throw new Error(`Expected a tagged observable, but got ${ball.value}.`);
    }
    const { observable$, label } = ball.value;

    // Modify the ticks inside the producer to start counting from the current tick
    const observable: TaggedObservable = {
      label,
      observable$: observable$.pipe(
        finalize(() => setTimeout(() => removeObservable(observable), 1000))
      ),
    };

    // Add the producer to the list of blocks
    addObservable(observable);

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
        {observables.slice(0, 1).map(({ observable$, label }, index) => (
          <Box centerAnchor key={index}>
            <SourceBlock source$={observable$} text={label} />
          </Box>
        ))}
      </Box>
      <Box centerAnchor>
        <Center rotation-y={Math.PI / 2}>
          <Base block="Cube034" />
        </Center>
      </Box>
    </>
  );
}
