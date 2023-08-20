import type {
  IntersectionEnterHandler,
  IntersectionExitHandler,
} from "@react-three/rapier";
import {
  BallCollider,
  RigidBody,
  interactionGroups,
} from "@react-three/rapier";
import { useStore } from "~/store";
import type { Ball } from "~/types";
import { CollisionGroup } from "~/utils";

export type BallDetectionHandler = (ball: Ball) => void;

export function BallDetector({
  onEnter,
  onExit,
  ...props
}: {
  onEnter?: BallDetectionHandler;
  onExit?: BallDetectionHandler;
} & JSX.IntrinsicElements["group"]) {
  const updateActivity = useStore((state) => state.updateActivity);
  const getBall = useStore((state) => state.getBall);

  const handler =
    (
      handle?: BallDetectionHandler
    ): IntersectionEnterHandler | IntersectionExitHandler =>
    ({ other }) => {
      if (other.rigidBodyObject?.name !== "ball") return;
      const ballId = other.rigidBodyObject.userData.id;
      const ball = getBall(ballId); // get the latest ball state
      if (!ball) return;

      handle?.(ball);

      updateActivity();
    };

  return (
    <group {...props}>
      <RigidBody type="fixed" colliders={false} sensor>
        <BallCollider
          sensor
          args={[0.05]}
          collisionGroups={interactionGroups(CollisionGroup.Detector, [
            CollisionGroup.Ball,
          ])}
          onIntersectionEnter={handler(onEnter)}
          onIntersectionExit={handler(onExit)}
        />
      </RigidBody>
    </group>
  );
}
