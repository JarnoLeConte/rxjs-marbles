import type { ForwardedRef } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { map, tap } from "rxjs";
import { Vector3 } from "three";
import { BuildTail } from "~/components/Build";
import { delayInBetween } from "~/observables/delayInBetween";
import { useStore } from "~/store";
import type { ObservableBuilder, OperatorBuilder, Value } from "~/types";
import type { Part, TrackPart } from "../parts";
import { Begin } from "../parts/Begin";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls being produced in the current frame.

  Values that are emitted within the same frame are delayed
  to make them appear one after the other.
*/

type Props = {
  track: TrackPart<Part.Producer>;
};

export const Producer = forwardRef(function Producer(
  { track }: Props,
  ref: ForwardedRef<ObservableBuilder>
) {
  const { displayText, source$ } = track.props;

  const tail = useRef<OperatorBuilder>(null!);
  const root = useRef<THREE.Group>(null!);
  const addBall = useStore((state) => state.addBall);
  const updateBall = useStore((state) => state.updateBall);

  const newBall = useCallback(
    (value: Value) => {
      // Initial ball position
      const position = root.current
        .localToWorld(new Vector3(1, 1.5, 0)) // start from inside the wall to give the ball a push
        .toArray();

      // Create the ball
      const id = addBall({ value, position, ghost: true });

      return id;
    },
    [addBall]
  );

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return source$.pipe(
          map((value) => ({ value, id: newBall(value) })),
          delayInBetween(1250),
          tap(({ id }) =>
            updateBall(id, (ball) => ({ ...ball, ghost: false }))
          ),
          map(({ value }) => value),
          tail.current.build()
        );
      },
    }),
    [source$, newBall, updateBall]
  );

  return (
    <group ref={root}>
      <Begin displayText={displayText ?? `source$.pipe(`} />
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
