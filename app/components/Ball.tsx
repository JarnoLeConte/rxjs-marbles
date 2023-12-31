import { Sphere } from "@react-three/drei";
import type { Color } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import {
  BallCollider,
  RigidBody,
  interactionGroups,
} from "@react-three/rapier";
import { useRef } from "react";
import { CollisionGroup } from "~/utils";
import { Text } from "./Text";
import { DoubleSide } from "three";

type BallProps = StaticBallProps & {
  id: number;
  ghost?: boolean; // When ball is 'ghost' it will not take part in physics simulation
};

type StaticBallProps = JSX.IntrinsicElements["group"] & {
  label: string;
  color?: Color;
  ghost?: boolean; // When ball is 'ghost' it is rendered grayed out
};

const RADIUS = 0.57;

export function Ball({ id, label, color, ghost, ...props }: BallProps) {
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
          collisionGroups={interactionGroups(CollisionGroup.Ball, [
            CollisionGroup.Track,
            CollisionGroup.Detector,
          ])}
        />
        <StaticBall label={label} color={color} ghost={ghost} />
      </RigidBody>
    </group>
  );
}

function StaticBall({ label, color, ghost, ...props }: StaticBallProps) {
  return (
    <group {...props}>
      <Text fontSize={0.19}>{label}</Text>
      <Sphere args={[RADIUS]} renderOrder={1}>
        <meshStandardMaterial
          color={color}
          metalness={0.2}
          roughness={0.0}
          transparent
          opacity={ghost ? 0.15 : 0.5}
          side={DoubleSide}
        />
      </Sphere>
    </group>
  );
}
