import { BallDetector } from "../BallDetector";
import { Txt } from "../Txt";
import { Element } from "./Element";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function Begin({ displayText, ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Element name="Cube023" />
        <BallDetector position={[0.5, 1, 0]} />
        <Txt position={[0, 0.5, 1]} maxWidth={1.7}>
          {displayText}
        </Txt>
      </group>
    </group>
  );
}
