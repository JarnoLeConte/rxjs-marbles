import { useGameStore } from "~/store";
import type { BallDetectionHandler } from "../BallDetector";
import { ExchangeBlock } from "./ExchangeBlock";

export function SwitchMapBlock(props: JSX.IntrinsicElements["group"]) {
  const addBall = useGameStore((state) => state.addBall);
  const removeBall = useGameStore((state) => state.removeBall);

  const onBallDetection: BallDetectionHandler = ({ id, value }) => {
    addBall({ value, position: [-2.05, 3, 0] });
    removeBall(id);
  };

  return <ExchangeBlock onBallDetection={onBallDetection} {...props} />;
}
