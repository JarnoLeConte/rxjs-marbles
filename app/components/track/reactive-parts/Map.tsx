import type { BallDetectionHandler } from "~/components/BallDetector";
import { useStore } from "~/store";
import type { Value } from "~/types";
import { Tunnel } from "../parts/Tunnel";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls and their incoming speed.
*/

type Props = JSX.IntrinsicElements["group"] & {
  project: (value: Value) => Value;
  displayText?: string;
};

export function Map({ project, displayText, ...props }: Props) {
  const updateBall = useStore((state) => state.updateBall);

  const onBallDetection: BallDetectionHandler = ({ id }) => {
    updateBall(id, (ball) => ({ ...ball, value: project(ball.value) }));
  };

  return (
    <group {...props}>
      <Tunnel onBallDetection={onBallDetection} displayText={displayText} />
    </group>
  );
}
