import { Text } from "@react-three/drei";
import { BallDetector } from "../../BallDetector";
import { Base } from "../elements/Base";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function Begin({ displayText, ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Base element="Cube023" />
        <BallDetector position={[0.5, 1, 0]} />
        <Text
          color="black"
          anchorX="center"
          anchorY="middle"
          position={[0, 0.5, 1]}
          fontSize={0.2}
          maxWidth={1.7}
        >
          {displayText}
        </Text>
      </group>
    </group>
  );
}
