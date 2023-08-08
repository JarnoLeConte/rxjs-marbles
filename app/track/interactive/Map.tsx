import type { BallDetectionHandler } from "~/components/BallDetector";
import { useGameStore } from "~/store";
import type { Value } from "~/types";
import { Tunnel } from "../segments/Tunnel";

type Props = JSX.IntrinsicElements["group"] & {
  project: (value: Value) => Value;
  displayText?: string;
};

export function Map({ project, displayText, ...props }: Props) {
  const updateBall = useGameStore((state) => state.updateBall);

  const onBallDetection: BallDetectionHandler = ({ id }) => {
    updateBall(id, (ball) => ({ ...ball, value: project(ball.value) }));
  };

  return (
    <group {...props}>
      <Tunnel onBallDetection={onBallDetection} displayText={displayText} />
    </group>
  );
}
