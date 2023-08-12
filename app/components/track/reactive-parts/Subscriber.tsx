import { useState } from "react";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useStore } from "~/store";
import type { Value } from "~/types";
import { renderValue } from "~/utils";
import { Bucket } from "../parts/Bucket";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  The subscriber component is used for presentation only,
  and does not actually subscribe to the observable, because
  that is currently handled by the runtime.
*/

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function Subscriber({ displayText, ...props }: Props) {
  const [value, setValue] = useState<Value>();

  const removeBall = useStore((state) => state.removeBall);

  const onBallDetection: BallDetectionHandler = (ball) => {
    setValue(ball.value);
    removeBall(ball.id);
  };

  return (
    <group {...props}>
      <Bucket
        onBallDetection={onBallDetection}
        displayText={displayText ?? `).subscribe(...)`}
        contentLabel={`console.log`}
        content={renderValue(value)}
      />
    </group>
  );
}
