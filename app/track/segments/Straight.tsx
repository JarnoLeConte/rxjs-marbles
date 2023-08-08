import { BallDetector } from "../../components/BallDetector";
import { Base } from "../../components/Base";

type Props = JSX.IntrinsicElements["group"];

export function Straight({ ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Base element="Cube052" />
        <BallDetector position={[0, 1, 0]} />
      </group>
    </group>
  );
}
