import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { BuildTail } from "~/components/Build";
import type { OperatorBuilder } from "~/types";
import type { Part, TrackPart } from "../parts";
import { DownHill as DownHillPart } from "../parts/DownHill";

type Props = {
  track: TrackPart<Part.DownHill>;
};

export const DownHill = forwardRef(function DownHill(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  return (
    <group>
      <DownHillPart />
      <group position={[4, -1, 0]}>
        <BuildTail ref={ref} track={track.tail} />
      </group>
    </group>
  );
});
