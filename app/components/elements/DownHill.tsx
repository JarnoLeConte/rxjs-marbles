import { BallDetector } from "../BallDetector";
import { Element } from "./Element";

type Props = JSX.IntrinsicElements["group"];

export function DownHill({ ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, -1, 0]}>
        <Element name="Cube547" rotation={[0, Math.PI / 2, 0]} />
        <Element name="Cube546" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[0, 2, 0]} />
        <BallDetector position={[2, 1, 0]} />
      </group>
    </group>
  );
}
