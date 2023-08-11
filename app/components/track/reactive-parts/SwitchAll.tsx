import { useState } from "react";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useGameStore } from "~/store";
import type { TaggedObservable } from "~/types";
import { isTaggedObservable } from "~/utils";
import { Tunnel } from "../parts/Tunnel";
import { Producer } from "./Producer";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function SwitchAll({ displayText, ...props }: Props) {
  const removeBall = useGameStore((state) => state.removeBall);

  const [observable, setObservable] = useState<TaggedObservable | null>(null);

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (!isTaggedObservable(ball.value)) {
      console.warn(`Expected a tagged observable, but got ${ball.value}.`);
      return;
    }
    setObservable(ball.value);
    removeBall(ball.id);
  };

  return (
    <group {...props}>
      <Tunnel
        onBallDetection={onBallDetection}
        displayText={displayText ?? "switchAll(),"}
        exitClosed
      />
      <group position={[0, 2, 0]}>
        <Producer
          subscribed={!!observable}
          source$={observable?.observable$}
          displayText={observable?.label ?? ""}
        />
      </group>
    </group>
  );
}
