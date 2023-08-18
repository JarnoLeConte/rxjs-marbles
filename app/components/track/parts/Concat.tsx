import { Center } from "@react-three/drei";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { concat } from "rxjs";
import { Build, BuildTail } from "~/components/Build";
import type { ObservableBuilder, OperatorBuilder } from "~/types";
import type { Part, TrackPart } from "../parts";
import { RightJoin } from "../../elements/RightJoin";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls and their incoming speed.
*/

type Props = {
  track: TrackPart<Part.Concat>;
};

export const Concat = forwardRef(function Concat(
  { track }: Props,
  ref: ForwardedRef<ObservableBuilder>
) {
  const { displayText } = track.props ?? {};

  /* Builder */

  const tail = useRef<OperatorBuilder>(null!);
  const a = useRef<ObservableBuilder>(null!);
  const b = useRef<ObservableBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        const A$ = a.current.build();
        const B$ = b.current.build();
        const tailOperator = tail.current.build();
        return concat(A$, B$).pipe(tailOperator);
      },
    }),
    []
  );

  return (
    <group position={[0, 0, 0]}>
      <RightJoin displayText={displayText ?? "concatWith(...),"} />
      <Center left top>
        <Build ref={a} track={track.incoming[0]} />
      </Center>
      <Center left top position={[0, 0, -2]}>
        <Build ref={b} track={track.incoming[1]} />
      </Center>
      <group position={[6, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
