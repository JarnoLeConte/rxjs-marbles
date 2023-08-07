import { Text } from "@react-three/drei";
import type { BallDetectionHandler } from "../BallDetector";
import { BallDetector } from "../BallDetector";
import { Base } from "../Base";

type Props = JSX.IntrinsicElements["group"] & {
  text?: string;
  onBallDetection?: BallDetectionHandler;
};

export function TerminalBlock({ text, onBallDetection, ...props }: Props) {
  return (
    <group {...props}>
      <group>
        <group position-y={-0.5}>
          <Base element="Cube023" position={[0, -0.5, 0]} />
        </group>
        <group position-y={0.5}>
          <group rotation-x={Math.PI}>
            <Base element="Cube023" position-y={-0.5} />
          </group>
        </group>
      </group>
      {onBallDetection && (
        <BallDetector position={[0, 0, 0]} onDetection={onBallDetection} />
      )}
      {/* Frontface */}
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.5, 1]}
        fontSize={0.2}
        maxWidth={1.7}
      >
        {text}
      </Text>
      {/* Backface */}
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.5, -1]}
        rotation-y={Math.PI}
        fontSize={0.2}
        maxWidth={1.7}
      >
        {text}
      </Text>
    </group>
  );
}
