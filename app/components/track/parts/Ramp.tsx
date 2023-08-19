import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { BuildTail } from "~/components/Build";
import type { OperatorBuilder } from "~/types";
import type { Part, TrackPart } from "../parts";
import { Ramp as RampPart } from "../../elements/Ramp";

type Props = {
  track: TrackPart<Part.Ramp>;
};

export const Ramp = forwardRef(function Ramp(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  return (
    <group>
      <RampPart />
      <group position={[2, -1, 0]}>
        <BuildTail ref={ref} track={track.tail} />
      </group>
    </group>
  );
});
