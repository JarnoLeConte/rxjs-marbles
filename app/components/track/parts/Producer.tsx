import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { EMPTY, finalize, tap } from "rxjs";
import { BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import type { ObservableBuilder, OperatorBuilder } from "~/types";
import type { Part, TrackPart } from "../parts";
import { useStore } from "~/store";

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
  const { displayText, source$ = EMPTY } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);

  /* Builder */

  const factory = useRef<OperatorBuilder>(null!);
  const tail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      observable() {
        return source$.pipe(tail.current.operator());
      },
      build() {
        // Keep registry of balls that are on the track
        // So we can remove them when observable completes early
        const ballRegistry: number[] = [];

        return source$.pipe(
          factory.current.build(), // produce a new ball
          tap(({ ballId }) => ballRegistry.push(ballId!)), // register ball
          tail.current.build(), // continue the track
          tap(({ ballId }) =>
            ballRegistry.splice(ballRegistry.indexOf(ballId!), 1)
          ), // unregister balls that have left the track
          finalize(() => ballRegistry.forEach(removeBall)) // clean up balls on completion
        );
      },
    }),
    [source$, removeBall]
  );

  return (
    <group>
      <Factory ref={factory} displayText={displayText ?? "source"} />
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
