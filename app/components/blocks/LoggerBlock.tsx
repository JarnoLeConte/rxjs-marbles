import { Text } from "@react-three/drei";
import { Base } from "./Base";
import type { BallDetectionHandler } from "../BallDetector";
import { BallDetector } from "../BallDetector";
import { useState } from "react";
import { useGameStore } from "~/store";

export function LoggerBlock(props: JSX.IntrinsicElements["group"]) {
  const [value, setValue] = useState<any>();

  const removeBall = useGameStore((state) => state.removeBall);

  const onBallDetection: BallDetectionHandler = (ball) => {
    setValue(ball.value);
    removeBall(ball.id);
  };

  return (
    <group {...props}>
      <group rotation={[0, Math.PI / 2, Math.PI / 2]}>
        <Base block="Cube023" position={[0, -1, 0]} />
        <Base block="Cube023" position={[0, 1, 0]} rotation-x={Math.PI} />
      </group>
      <BallDetector position-y={-0.5} onDetection={onBallDetection} />
      {value !== undefined && (
        <>
          <Text
            color="black"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.3, 1]}
            fontSize={0.6}
          >
            {value}
          </Text>
          <Text
            color="black"
            anchorX="center"
            anchorY="middle"
            position={[0, 0.4, 1]}
            fontSize={0.2}
          >
            observed
          </Text>
        </>
      )}
    </group>
  );
}
