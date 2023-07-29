import { Text } from "@react-three/drei";
import { Base } from "./Base";
import type { BallDetectionHandler } from "../BallDetector";
import { BallDetector } from "../BallDetector";

type Props = JSX.IntrinsicElements["group"] & {
  text?: string;
  onBallDetection?: BallDetectionHandler;
};

export function TerminalBlock({ text, onBallDetection, ...props }: Props) {
  return (
    <group {...props}>
      <group>
        <Base block="Cube023" position={[0, 0, 0]} />
        <Base block="Cube023" position={[0, 2, 0]} rotation-x={Math.PI} />
      </group>
      {onBallDetection && (
        <BallDetector position={[0, 1, 0]} onDetection={onBallDetection} />
      )}
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.5, 1]}
        fontSize={0.2}
        maxWidth={1.7}
      >
        {text}
      </Text>
    </group>
  );
}
