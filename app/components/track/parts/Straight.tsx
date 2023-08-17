import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { BuildTail } from "~/components/Build";
import type { OperatorBuilder } from "~/types";
import type { Part, TrackPart } from "../parts";
import { Straight as StraightPart } from "../../elements/Straight";

type Props = {
  track: TrackPart<Part.Straight>;
};

export const Straight = forwardRef(function Straight(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  return (
    <group>
      <StraightPart />
      <group position={[2, 0, 0]}>
        <BuildTail ref={ref} track={track.tail} />
      </group>
    </group>
  );
});
