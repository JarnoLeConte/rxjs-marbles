import { forwardRef } from "react";
import type { Observable } from "rxjs";
import { BuildTail } from "~/components/Build";
import { useBuilder } from "~/hooks/useBuilder";
import { useTail } from "~/hooks/useTail";
import type { Builder, Value } from "~/types";
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
  builder: Builder<Observable<Value>>
) {
  const tail = useTail();

  useBuilder(builder, () => track.props.source$.pipe(tail.get()));

  return (
    <group>
      <Begin displayText={track.props.displayText ?? `source$.pipe(`} />
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail.ref} track={track.tail} />
      </group>
    </group>
  );
});
