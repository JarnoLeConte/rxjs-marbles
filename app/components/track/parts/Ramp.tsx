import { BallDetector } from "../../BallDetector";
import { Base } from "../elements/Base";

type Props = JSX.IntrinsicElements["group"];

export function Ramp({ ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Base element="Cube034" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[0, 1, 0]} />
      </group>
    </group>
  );
}
