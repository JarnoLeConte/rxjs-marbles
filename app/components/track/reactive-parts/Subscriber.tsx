import { useEffect, useState } from "react";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useGameStore } from "~/store";
import type { Value } from "~/types";
import { Bucket } from "../parts/Bucket";
import { Text } from "@react-three/drei";
import { renderValue } from "~/utils";

type Props = {
  displayText?: string;
  onSubscribe: () => void;
};

export function Subscriber({ displayText, onSubscribe }: Props) {
  const [value, setValue] = useState<Value>();

  const removeBall = useGameStore((state) => state.removeBall);

  const onBallDetection: BallDetectionHandler = (ball) => {
    setValue(ball.value);
    removeBall(ball.id);
  };

  useEffect(() => {
    onSubscribe();
  }, [onSubscribe]);

  return (
    <group>
      <Bucket onBallDetection={onBallDetection} />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        position={[1, 0.5, 1]}
        fontSize={0.2}
        maxWidth={1.3}
      >
        {displayText ?? `).subscribe(...)`}
      </Text>
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        position={[1, -0.6, 1]}
        fontSize={0.2}
        maxWidth={1.3}
      >
        {`console.log`}
      </Text>
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[1, -1.3, 1]}
        fontSize={0.6}
      >
        {renderValue(value)}
      </Text>
    </group>
  );
}
