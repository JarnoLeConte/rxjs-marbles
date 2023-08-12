import { BallDetector } from "../../BallDetector";
import { Element } from "../elements/Element";

type Props = JSX.IntrinsicElements["group"];

export function Straight({ ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Element name="Cube052" />
        <BallDetector position={[0, 1, 0]} />
      </group>
    </group>
  );
}
