import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { BuildTail } from "~/components/Build";
import type { ObservableBuilder, OperatorBuilder } from "~/types";
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
  track: TrackPart & { part: Part.Producer };
};

export const Producer = forwardRef(function Producer(
  { track }: Props,
  ref: ForwardedRef<ObservableBuilder>
) {
  const tailRef = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return track.props.source$.pipe(tailRef.current.build());
      },
    }),
    [track]
  );

  return (
    <group>
      <Begin displayText={track.props.displayText ?? `source$.pipe(`} />
      <group position={[2, 0, 0]}>
        <BuildTail ref={tailRef} track={track.tail} />
      </group>
    </group>
  );
});
