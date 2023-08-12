import type { BallDetectionHandler } from "~/components/BallDetector";
import { useStore } from "~/store";
import type { Value } from "~/types";
import { Tunnel } from "../parts/Tunnel";
import { useState } from "react";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls and their incoming speed.
*/

type Props = JSX.IntrinsicElements["group"] & {
  project: (value: Value, index: number) => Value;
  displayText?: string;
};

export function Map({ project, displayText, ...props }: Props) {
  const updateBall = useStore((state) => state.updateBall);
  const [index, setIndex] = useState(0);

  const onBallDetection: BallDetectionHandler = ({ id }) => {
    updateBall(id, (ball) => ({
      ...ball,
      value: project(ball.value, index),
    }));
    setIndex((count) => count + 1);
  };

  return (
    <group {...props}>
      <Tunnel onBallDetection={onBallDetection} displayText={displayText} />
    </group>
  );
}
