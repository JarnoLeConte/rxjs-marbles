import { useGameStore } from "~/store";
import type { Value } from "~/types";
import type { BallDetectionHandler } from "../BallDetector";
import { PassThroughBlock } from "./PassThroughBlock";

type Props = JSX.IntrinsicElements["group"] & {
  project: (value: Value) => Value;
  text: string;
};

export function MapOperatorBlock({ project, text, ...props }: Props) {
  const updateBall = useGameStore((state) => state.updateBall);

  const onBallDetection: BallDetectionHandler = ({ id }) => {
    updateBall(id, (ball) => ({ ...ball, value: project(ball.value) }));
  };

  return (
    <PassThroughBlock
      onBallDetection={onBallDetection}
      text={text}
      {...props}
    />
  );
}
