import { BallDetector } from "../../components/BallDetector";
import { Base } from "../elements/Base";

type Props = JSX.IntrinsicElements["group"];

export function DownHill({ ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, -1, 0]}>
        <Base element="Cube547" rotation={[0, Math.PI / 2, 0]} />
        <Base element="Cube546" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[0, 2, 0]} />
        <BallDetector position={[2, 1, 0]} />
      </group>
    </group>
  );
}
