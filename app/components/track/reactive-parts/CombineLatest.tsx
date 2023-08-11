import { useMemo, useState } from "react";
import { Subject } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useGameStore } from "~/store";
import type { Value } from "~/types";
import { renderValue } from "~/utils";
import { Bucket } from "../parts/Bucket";
import { Producer } from "./Producer";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function CombineLatest({ displayText, ...props }: Props) {
  const removeBall = useGameStore((state) => state.removeBall);

  const [valueA, setValueA] = useState<Value>();
  const [valueB, setValueB] = useState<Value>();

  const subject$ = useMemo(() => new Subject<Value>(), []);

  const handleA: BallDetectionHandler = (ball) => {
    setValueA(ball.value);
    removeBall(ball.id);
    if (valueB !== undefined) {
      subject$.next([ball.value, valueB]);
    }
  };

  const handleB: BallDetectionHandler = (ball) => {
    setValueB(ball.value);
    removeBall(ball.id);
    if (valueA !== undefined) {
      subject$.next([valueA, ball.value]);
    }
  };

  return (
    <group {...props}>
      <Bucket
        position={[0, 0, 0]}
        content={renderValue(valueA) ?? "?"}
        contentLabel="memory"
        onBallDetection={handleA}
      />
      <Bucket
        position={[2, 0, -2]}
        content={renderValue(valueB) ?? "?"}
        contentLabel="memory"
        onBallDetection={handleB}
      />
      <Producer
        position={[2, -3, 0]}
        source$={subject$}
        displayText="combineLatest(A, B)"
      />
    </group>
  );
}
