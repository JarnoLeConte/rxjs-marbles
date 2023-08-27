import type { ForwardedRef } from "react";
import { forwardRef, useState } from "react";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useStore } from "~/store";
import type { OperatorBuilder } from "~/types";
import { Bucket } from "../../elements/Bucket";
import type { Part, TrackPart } from "../parts";
import { Identity } from "./Identity";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  The subscriber component is used for presentation only,
  and does not actually subscribe to the observable, because
  that is currently handled by the runtime.
*/

type Props = {
  track: TrackPart<Part.Subscriber>;
};

export const Observer = forwardRef(function Observer(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);

  const [label, setLabel] = useState<string>();

  const onBallDetection: BallDetectionHandler = (ball) => {
    setLabel(ball.label);
    removeBall(ball.id);
  };

  return (
    <group>
      <Bucket
        onBallDetection={onBallDetection}
        displayText={displayText ?? `).subscribe(...)`}
        contentLabel={`observer`}
        content={label ?? "-"}
      />
      <Identity ref={ref} />
    </group>
  );
});
