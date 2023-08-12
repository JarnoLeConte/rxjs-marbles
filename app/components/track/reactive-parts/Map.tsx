import type { BallDetectionHandler } from "~/components/BallDetector";
import { useStore } from "~/store";
import type { Value } from "~/types";
import { Tunnel } from "../parts/Tunnel";

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
