import type { Ball } from "~/types";
import { BallDetector } from "../BallDetector";
import { Text2D } from "../Text2D";
import { Element } from "./Element";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
  onEnter?: (ball: Ball) => void;
  onExit?: (ball: Ball) => void;
};

export function Begin({ displayText, onEnter, onExit, ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Element name="Cube023" />
        <BallDetector position={[0, 1.5, 0]} onEnter={onEnter} />
        <BallDetector position={[1, 1, 0]} onExit={onExit} />
        <Text2D position={[0, 0.5, 1]} maxWidth={1.7}>
          {displayText}
        </Text2D>
      </group>
    </group>
  );
}
