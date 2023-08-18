import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { EMPTY } from "rxjs";
import { BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import type { ObservableBuilder, OperatorBuilder } from "~/types";
import type { Part, TrackPart } from "../parts";

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

  /* Builder */

  const factory = useRef<OperatorBuilder>(null!);
  const tail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return source$.pipe(factory.current.build(), tail.current.build());
      },
    }),
    [source$]
  );

  return (
    <group>
      <Factory ref={factory} displayText={displayText ?? `source$.pipe(`} />
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
