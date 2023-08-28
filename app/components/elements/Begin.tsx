import type { Ball } from "~/types";
import { BallDetector } from "../BallDetector";
import { Text } from "../Text";
import { Element } from "./Element";
import type { Color } from "@react-three/fiber";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
  textBackgroundColor?: Color;
  onEnter?: (ball: Ball) => void;
  onExit?: (ball: Ball) => void;
};

export function Begin({
  displayText,
  textBackgroundColor,
  onEnter,
  onExit,
  ...props
}: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Element name="Cube023" />
        <BallDetector position={[0, 1.5, 0]} onEnter={onEnter} />
        <BallDetector position={[1, 1, 0]} onExit={onExit} />
        <Text position={[0, 0.5, 1]} backgroundColor={textBackgroundColor}>
          {displayText}
        </Text>
      </group>
    </group>
  );
}
