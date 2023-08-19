import { Sphere } from "@react-three/drei";
import type { Color } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import {
  BallCollider,
  RigidBody,
  interactionGroups,
} from "@react-three/rapier";
import { useRef } from "react";
import type { Value } from "~/types";
import { renderValue } from "~/utils";
import { Text2D } from "./Text2D";

type BallProps = StaticBallProps & {
  id: number;
  ghost?: boolean; // When ball is 'ghost' it will not take part in physics simulation
};

type StaticBallProps = JSX.IntrinsicElements["group"] & {
  value: Value;
  color?: Color;
  ghost?: boolean; // When ball is 'ghost' it is rendered grayed out
};

const RADIUS = 0.57;

export function Ball({ id, value, color, ghost, ...props }: BallProps) {
  const rigidBody = useRef<RapierRigidBody>(null);

  return (
    <group {...props}>
      <RigidBody
        ref={rigidBody}
        name="ball"
        colliders={false}
        userData={{ id }}
        type={ghost ? "fixed" : "dynamic"}
      >
        <BallCollider
          args={[RADIUS]}
          collisionGroups={
            ghost
              ? interactionGroups(1, []) // part of balls, no colissions
              : interactionGroups(1, [0, 1]) // part of balls, collide with track and balls
          }
        />
        <StaticBall value={value} color={color} ghost={ghost} />
      </RigidBody>
    </group>
  );
}

function StaticBall({ value, color, ghost, ...props }: StaticBallProps) {
  return (
    <group {...props}>
      <Text2D opacity={ghost ? 0.3 : 1} fontSize={0.25}>
        {renderValue(value)}
      </Text2D>
      <Sphere args={[RADIUS]}>
        <meshStandardMaterial
          color={ghost ? "#ccc" : color}
          metalness={1}
          roughness={0}
          transparent
          opacity={ghost ? 0.2 : 0.3}
        />
      </Sphere>
    </group>
  );
}
