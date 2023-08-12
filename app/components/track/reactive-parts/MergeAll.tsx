import { useState } from "react";
import { delay } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useGameStore } from "~/store";
import type { TaggedObservable } from "~/types";
import { isTaggedObservable } from "~/utils";
import { Tunnel } from "../parts/Tunnel";
import { Producer } from "./Producer";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function MergeAll({ displayText, ...props }: Props) {
  const removeBall = useGameStore((state) => state.removeBall);

  // Keep track of the active producers which are currently emitting balls
  // and being merged
  const [observables, setObservables] = useState<TaggedObservable[]>([]);

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (!isTaggedObservable(ball.value)) {
      console.error(`Expected a tagged observable, but got ${ball.value}.`);
      return;
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
    <group {...props}>
      <Tunnel
        onBallDetection={onBallDetection}
        displayText={displayText ?? "mergeAll(),"}
        exitClosed
      />
      {observables.map(({ observable$, label }, index) => (
        <group key={index} position={[0, 2 + index * 2, 0]}>
          <Producer source$={observable$} displayText={label ?? ""} />
        </group>
      ))}
    </group>
  );
}
