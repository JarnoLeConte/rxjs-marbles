import { Text } from "@react-three/drei";
import { useGameStore } from "~/store";
import type { BallDetectionHandler } from "../BallDetector";
import { BallDetector } from "../BallDetector";
import { Base } from "./Base";

export function OperatorBlock(props: JSX.IntrinsicElements["group"]) {
  const updateBall = useGameStore((state) => state.updateBall);

  const onBallDetection: BallDetectionHandler = ({ id }) => {
    updateBall(id, (ball) => ({ ...ball, value: ball.value * 2 }));
  };

  return (
    <group {...props}>
      <Base block="Cube062" position-y={1} rotation-y={Math.PI / 2} />
      <BallDetector position-y={1} onDetection={onBallDetection} />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.5, 1]}
        fontSize={0.2}
      >
        {`map((x) => x * 2),`}
      </Text>
    </group>
  );
}
