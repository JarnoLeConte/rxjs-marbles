import { useGameStore } from "~/store";
import type { BallDetectionHandler } from "../BallDetector";
import { PassThroughBlock } from "./PassThroughBlock";

type Props<In, Out> = JSX.IntrinsicElements["group"] & {
  operation: (x: In) => Out;
  text: string;
};

export function MapOperatorBlock<In, Out>({
  operation,
  text,
  ...props
}: Props<In, Out>) {
  const updateBall = useGameStore((state) => state.updateBall);

  const onBallDetection: BallDetectionHandler = ({ id }) => {
    updateBall(id, (ball) => ({ ...ball, value: operation(ball.value) }));
  };

  return (
    <PassThroughBlock
      onBallDetection={onBallDetection}
      text={text}
      {...props}
    />
  );
}
