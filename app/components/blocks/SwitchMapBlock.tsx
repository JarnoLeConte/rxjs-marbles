import { useEffect, useRef, useState } from "react";
import { Vector3, type Group } from "three";
import { useGameStore } from "~/store";
import type { Ball, BallContent } from "~/types";
import type { BallDetectionHandler } from "../BallDetector";
import { ExchangeBlock } from "./ExchangeBlock";

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
    const { content, color } = detected;

    if (content.type !== "number") {
      throw new Error(
        `At the moment 'switchMap' is not implemented for content type ${content.type}.`
      );
    }

    const newBall = (value: any) => {
      const content: BallContent = { type: "number", value };
      const position = ref.current
        .localToWorld(new Vector3(-1.05, 1, 0))
        .toArray();
      addBall({ content, position, color });
    };

    const timer0 = setTimeout(() => newBall(content.value), 0);
    const timer1 = setTimeout(() => newBall(content.value + 1), 800);
    const timer2 = setTimeout(() => newBall(content.value + 2), 1600);

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
