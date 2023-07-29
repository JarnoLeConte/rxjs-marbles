import { useGameStore } from "~/store";
import type { BallDetectionHandler } from "../BallDetector";
import { ExchangeBlock } from "./ExchangeBlock";
import { useEffect, useState } from "react";
import type { Ball } from "~/types";

export function SwitchMapBlock(props: JSX.IntrinsicElements["group"]) {
  const addBall = useGameStore((state) => state.addBall);
  const removeBall = useGameStore((state) => state.removeBall);

  const [detected, setDetected] = useState<Ball | null>(null);

  const onBallDetection: BallDetectionHandler = (ball) => {
    setDetected(ball);
    removeBall(ball.id);
  };

  useEffect(() => {
    if (!detected) return;
    const { value } = detected;

    addBall({ value, position: [-2.05, 3, 0] });

    const timer1 = setTimeout(
      () => addBall({ value: value + 1, position: [-2.05, 3, 0] }),
      800
    );

    const timer2 = setTimeout(
      () => addBall({ value: value + 2, position: [-2.05, 3, 0] }),
      1600
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [detected, addBall]);

  const text = `
switchMap((x) =>
  from([x, x+1, x+2])
),`;

  return (
    <ExchangeBlock onBallDetection={onBallDetection} text={text} {...props} />
  );
}
