import { BallDetector } from "../BallDetector";
import { Base } from "../Base";

export function RightShiftTrack(props: JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Base element="Cube046" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[0, 1, 0.3]} />
        <BallDetector position={[2, 1, 1.8]} />
      </group>
    </group>
  );
}
