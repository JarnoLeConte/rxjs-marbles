import { BallDetector } from "../../BallDetector";
import { Element } from "../elements/Element";

type Props = JSX.IntrinsicElements["group"];

export function Ramp({ ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Element name="Cube034" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[0, 1, 0]} />
      </group>
    </group>
  );
}
