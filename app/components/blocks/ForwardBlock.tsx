import { BallDetector } from "../BallDetector";
import { Base } from "./Base";

export function ForwardBlock(props: JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      <Base block="Cube052" position={[0, -0.5, 0]} />
      <BallDetector position={[0, 0.5, 0]} />
    </group>
  );
}
