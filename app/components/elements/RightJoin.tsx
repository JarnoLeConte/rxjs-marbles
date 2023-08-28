import { BallDetector } from "../BallDetector";
import { Text } from "../Text";
import { Element } from "./Element";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function RightJoin({ displayText, ...props }: Props) {
  return (
    <group {...props}>
      <group position={[3, 0, -1]}>
        <Element name="Cube247" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[-2, 1, -1]} />
        <BallDetector position={[0, 1, 0.2]} />
        <BallDetector position={[-2, 1, 1]} />
        <BallDetector position={[0, 1, 1]} />
        <BallDetector position={[2, 1, 1]} />
        {displayText && (
          <Text position={[0, 0.5, 2]} fontSize={0.156}>
            {displayText}
          </Text>
        )}
      </group>
    </group>
  );
}
