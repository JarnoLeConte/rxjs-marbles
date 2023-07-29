import { Text } from "@react-three/drei";
import { useState } from "react";
import { useGameStore } from "~/store";
import type { BallDetectionHandler } from "../BallDetector";
import { TerminalBlock } from "./TerminalBlock";

export function LoggerBlock(props: JSX.IntrinsicElements["group"]) {
  const [value, setValue] = useState<any>("-");

  const removeBall = useGameStore((state) => state.removeBall);

  const onBallDetection: BallDetectionHandler = (ball) => {
    setValue(ball.value);
    removeBall(ball.id);
  };

  return (
    <group {...props}>
      <TerminalBlock
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        onBallDetection={onBallDetection}
      />
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
            textAlign="center"
            position={[0, 0.4, 1]}
            fontSize={0.2}
            maxWidth={1.3}
          >
            observed value
          </Text>
        </>
      )}
    </group>
  );
}
