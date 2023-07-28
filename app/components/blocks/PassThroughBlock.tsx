import { Text } from "@react-three/drei";
import type { BallDetectionHandler } from "../BallDetector";
import { BallDetector } from "../BallDetector";
import { Base } from "./Base";

type Props = JSX.IntrinsicElements["group"] & {
  onBallDetection?: BallDetectionHandler;
  text: string;
};

export function PassThroughBlock({ onBallDetection, text, ...props }: Props) {
  return (
    <group {...props}>
      <Base block="Cube062" position-y={1} rotation-y={Math.PI / 2} />
      {onBallDetection && (
        <BallDetector position-y={1} onDetection={onBallDetection} />
      )}
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.5, 1]}
        fontSize={0.2}
      >
        {text}
      </Text>
    </group>
  );
}
