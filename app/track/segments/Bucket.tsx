import type { BallDetectionHandler } from "../../components/BallDetector";
import { BallDetector } from "../../components/BallDetector";
import { Base } from "../../components/Base";

type Props = JSX.IntrinsicElements["group"] & {
  onBallDetection?: BallDetectionHandler;
};

export function Bucket({ onBallDetection, ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Base element="Cube703" rotation={[0, Math.PI, 0]} />
        <Base
          element="Cube061"
          position={[0, -2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <BallDetector position={[0, 1, 0]} />
        <BallDetector position={[0, -1, 0]} onDetection={onBallDetection} />
      </group>
    </group>
  );
}
