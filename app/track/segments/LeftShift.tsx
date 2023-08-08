import { BallDetector } from "../../components/BallDetector";
import { Base } from "../../components/Base";

type Props = JSX.IntrinsicElements["group"];

export function LeftShift({ ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Base element="Cube026" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[-0.5, 1, -0.3]} />
        <BallDetector position={[1, 1, -1]} />
        <BallDetector position={[2.5, 1, -1.8]} />
      </group>
    </group>
  );
}
