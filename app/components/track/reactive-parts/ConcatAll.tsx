import { useState } from "react";
import { finalize } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useGameStore } from "~/store";
import type { TaggedObservable } from "~/types";
import { isTaggedObservable } from "~/utils";
import { Tunnel } from "../parts/Tunnel";
import { Producer } from "./Producer";

type Props = JSX.IntrinsicElements["group"] & {
  name: string;
  displayText?: string;
};

export function ConcatAll({ name, displayText, ...props }: Props) {
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
      console.error(`Expected a tagged observable, but got ${ball.value}.`);
      return;
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
    <group {...props}>
      <Tunnel
        onBallDetection={onBallDetection}
        displayText={displayText ?? "concatAll(),"}
        entryClosed={observables.length > 0}
        exitClosed
      />
      <group position={[0, 2, 0]}>
        <Producer
          name={`${name}#0`}
          source$={observables[0]?.observable$}
          displayText={observables[0]?.label ?? ""}
        />
      </group>
    </group>
  );
}
