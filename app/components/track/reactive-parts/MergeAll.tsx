import { useState } from "react";
import { delay } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useStore } from "~/store";
import type { TaggedObservable } from "~/types";
import { isTaggedObservable } from "~/utils";
import { Tunnel } from "../parts/Tunnel";
import { Producer } from "./Producer";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of incoming balls and balls being produced.

  Values that are emitted within the same frame are delayed
  to make them appear one after the other. Though, we do preserve the order
  in which producers emit.
*/

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function MergeAll({ displayText, ...props }: Props) {
  const removeBall = useStore((state) => state.removeBall);

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
