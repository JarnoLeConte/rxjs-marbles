import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  EMPTY,
  concatAll,
  finalize,
  ignoreElements,
  mergeWith,
  pipe,
} from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { BuildTail } from "~/components/Build";
import { useStore } from "~/store";
import type {
  ObservableBuilder,
  OperatorBuilder,
  TaggedObservable,
} from "~/types";
import { assertObservable, isTaggedObservable } from "~/utils";
import type { TrackPart } from "../parts";
import { Part } from "../parts";
import { Tunnel } from "../../elements/Tunnel";
import { Producer } from "./Producer";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of incoming balls and balls being produced.
*/

type Props = {
  track: TrackPart<Part.ConcatAll>;
};

export const ConcatAll = forwardRef(function ConcatAll(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);

  const tail = useRef<OperatorBuilder>(null!);
  const producer = useRef<ObservableBuilder>(null!);

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

  useImperativeHandle(
    ref,
    () => ({
      build() {
        const tailOperator = tail.current.build();
        const producer$ = producer.current.build();
        return pipe(
          mergeWith(producer$.pipe(ignoreElements())),
          assertObservable(),
          concatAll(),
          tailOperator
        );
      },
    }),
    []
  );

  return (
    <group>
      <group>
        <Tunnel
          onBallDetection={onBallDetection}
          displayText={displayText ?? "concatAll(),"}
          entryClosed={observables.length > 0}
          exitClosed
        />
        <group position={[0, 2, 0]}>
          <Producer
            ref={producer}
            track={{
              part: Part.Producer,
              props: {
                source$: observables[0]?.observable$ ?? EMPTY,
                displayText: observables[0]?.label ?? "",
              },
              tail: null,
            }}
          />
        </group>
      </group>
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
