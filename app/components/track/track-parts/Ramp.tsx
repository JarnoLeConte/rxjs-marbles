import { forwardRef } from "react";
import type { OperatorFunction } from "rxjs";
import { BuildTail } from "~/components/Build";
import type { Builder, Value } from "~/types";
import { BallDetector } from "../../BallDetector";
import { Element } from "../elements/Element";
import type { Part, TrackPart } from "../parts";
import { useBuilder } from "~/hooks/useBuilder";
import { useTail } from "~/hooks/useTail";

type Props = {
  track: TrackPart & { part: Part.Ramp };
};

export const Ramp = forwardRef(function Ramp(
  { track }: Props,
  builder: Builder<OperatorFunction<Value, Value>>
) {
  const [operator, ref] = useTail();
  useBuilder(builder, () => operator);
  return (
    <group>
      <group position={[1, 0, 0]}>
        <Element name="Cube034" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[0, 1, 0]} />
      </group>
      <group position={[2, -1, 0]}>
        <BuildTail ref={ref} track={track.tail} />
      </group>
    </group>
  );
});
