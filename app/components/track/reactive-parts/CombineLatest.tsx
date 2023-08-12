import { useMemo, useState } from "react";
import { Subject } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useStore } from "~/store";
import type { Value } from "~/types";
import { renderValue } from "~/utils";
import { Bucket } from "../parts/Bucket";
import { Producer } from "./Producer";
import { Base } from "../elements/Base";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function CombineLatest({ displayText, ...props }: Props) {
  const removeBall = useStore((state) => state.removeBall);

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
        content={valueA !== undefined ? renderValue(valueA) : "?"}
        contentLabel="memory"
        onBallDetection={handleA}
      />
      <Base position={[0, -3, 0]} />
      <Bucket
        position={[2, 0, -2]}
        content={valueB !== undefined ? renderValue(valueB) : "?"}
        contentLabel="memory"
        onBallDetection={handleB}
      />
      <Base position={[2, -3, -2]} />
      <Producer
        position={[2, -3, 0]}
        source$={subject$}
        displayText="combineLatest(A, B)"
      />
    </group>
  );
}
