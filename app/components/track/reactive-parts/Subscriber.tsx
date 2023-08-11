import { useState } from "react";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useGameStore } from "~/store";
import type { Value } from "~/types";
import { renderValue } from "~/utils";
import { Bucket } from "../parts/Bucket";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function Subscriber({ displayText, ...props }: Props) {
  const [value, setValue] = useState<Value>();

  const removeBall = useGameStore((state) => state.removeBall);

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
