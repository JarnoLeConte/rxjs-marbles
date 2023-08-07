import { BallDetector } from "../BallDetector";
import { Base } from "../Base";

export function StraightTrack(props: JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Base element="Cube052" />
        <BallDetector position={[0, 1, 0]} />
      </group>
    </group>
  );
}
