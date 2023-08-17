import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { EMPTY, ignoreElements, mergeWith, pipe, switchAll } from "rxjs";
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
  track: TrackPart<Part.SwitchAll>;
};

export const SwitchAll = forwardRef(function SwitchAll(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);

  const tail = useRef<OperatorBuilder>(null!);
  const producer = useRef<ObservableBuilder>(null!);

  const [observable, setObservable] = useState<TaggedObservable | null>(null);

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (!isTaggedObservable(ball.value)) {
      console.warn(`Expected a tagged observable, but got ${ball.value}.`);
      return;
    }
    setObservable(ball.value);
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
          switchAll(),
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
          displayText={displayText ?? "switchAll(),"}
          exitClosed
        />
        <group position={[0, 2, 0]}>
          <Producer
            ref={producer}
            track={{
              part: Part.Producer,
              props: {
                source$: observable?.observable$ ?? EMPTY,
                displayText: observable?.label ?? "",
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
