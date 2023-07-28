import type { IntersectionEnterHandler } from "@react-three/rapier";
import { BallCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useGameStore } from "~/store";
import type { Ball } from "~/types";

export type BallDetectionHandler = (ball: Ball) => void;

export function BallDetector({
  onDetection,
  ...props
}: { onDetection: BallDetectionHandler } & JSX.IntrinsicElements["group"]) {
  const getBall = useGameStore((state) => state.getBall);
  const detection = useRef(null); // store the id of the ball that was detected

  const onIntersectionEnter: IntersectionEnterHandler = ({ other }) => {
    if (other.rigidBodyObject?.name !== "ball") return;

    const ballId = other.rigidBodyObject.userData.id;
    if (ballId === detection.current) return; // don't detect the same ball twice

    const ball = getBall(ballId); // get the latest ball state
    if (!ball) return;

    detection.current = ballId;
    onDetection(ball);
  };

  return (
    <group {...props}>
      <RigidBody type="fixed" colliders={false} sensor>
        <BallCollider args={[0.2]} onIntersectionEnter={onIntersectionEnter} />
      </RigidBody>
    </group>
  );
}
