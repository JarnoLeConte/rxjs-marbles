import { useGameStore } from "~/store";
import type { BallDetectionHandler } from "../BallDetector";
import { ExchangeBlock } from "./ExchangeBlock";
import { useEffect, useRef, useState } from "react";
import type { Ball } from "~/types";
import { Vector3, type Group } from "three";

export function SwitchMapBlock(props: JSX.IntrinsicElements["group"]) {
  const addBall = useGameStore((state) => state.addBall);
  const removeBall = useGameStore((state) => state.removeBall);

  const ref = useRef<Group>(null!);

  const [detected, setDetected] = useState<Ball | null>(null);

  const onBallDetection: BallDetectionHandler = (ball) => {
    setDetected(ball);
    removeBall(ball.id);
  };

  useEffect(() => {
    if (!detected) return;
    const { value, color } = detected;

    const newBall = (value: any) => {
      const position = ref.current
        .localToWorld(new Vector3(-1.05, 1, 0))
        .toArray();
      addBall({ value, position, color });
    };

    const timer0 = setTimeout(() => newBall(value), 0);
    const timer1 = setTimeout(() => newBall(value + 1), 800);
    const timer2 = setTimeout(() => newBall(value + 2), 1600);

    return () => {
      clearTimeout(timer0);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [detected, addBall]);

  const text = `switchMap((x) =>
  from([x, x+1, x+2])
),`;

  return (
    <group ref={ref}>
      <ExchangeBlock
        onBallDetection={onBallDetection}
        textBottom={text}
        {...props}
      />
    </group>
  );
}
