import { useGameStore } from "~/store";
import type { BallContent } from "~/types";
import type { BallDetectionHandler } from "../BallDetector";
import { PassThroughBlock } from "./PassThroughBlock";

type Props = JSX.IntrinsicElements["group"] & {
  operation: (content: BallContent) => BallContent;
  text: string;
};

export function MapOperatorBlock({ operation, text, ...props }: Props) {
  const updateBall = useGameStore((state) => state.updateBall);

  const onBallDetection: BallDetectionHandler = ({ id }) => {
    updateBall(id, (ball) => ({ ...ball, content: operation(ball.content) }));
  };

  return (
    <PassThroughBlock
      onBallDetection={onBallDetection}
      text={text}
      {...props}
    />
  );
}
