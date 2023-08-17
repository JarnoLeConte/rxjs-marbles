import type { ForwardedRef } from "react";
import { forwardRef, useState } from "react";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useStore } from "~/store";
import type { OperatorBuilder, Value } from "~/types";
import { renderValue } from "~/utils";
import type { Part, TrackPart } from "../parts";
import { Bucket } from "../../elements/Bucket";
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

  const [value, setValue] = useState<Value>();

  const onBallDetection: BallDetectionHandler = (ball) => {
    setValue(ball.value);
    removeBall(ball.id);
  };

  return (
    <group>
      <Bucket
        onBallDetection={onBallDetection}
        displayText={displayText ?? `).subscribe(...)`}
        contentLabel={`console.log`}
        content={renderValue(value)}
      />
      <Identity ref={ref} />
    </group>
  );
});
