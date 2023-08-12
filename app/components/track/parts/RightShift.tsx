import { BallDetector } from "../../BallDetector";
import { Element } from "../elements/Element";

type Props = JSX.IntrinsicElements["group"];

export function RightShift({ ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Element name="Cube046" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[-0.5, 1, 0.3]} />
        <BallDetector position={[1, 1, 1]} />
        <BallDetector position={[2.5, 1, 1.8]} />
      </group>
    </group>
  );
}
