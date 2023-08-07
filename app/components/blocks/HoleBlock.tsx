import { Text } from "@react-three/drei";
import { Base } from "../Base";
import { BallDetector } from "../BallDetector";

type Props = JSX.IntrinsicElements["group"] & {
  text?: React.ReactNode;
};

export function HoleBlock({ text, ...props }: Props) {
  return (
    <group {...props}>
      <Base element="Cube703" rotation-y={Math.PI} position={[0, -0.5, 0]} />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 1]}
        fontSize={0.2}
      >
        {text}
      </Text>
      <BallDetector position={[0, 0.5, 0]} />
    </group>
  );
}
