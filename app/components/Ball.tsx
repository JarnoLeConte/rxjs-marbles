import { Sphere, Text } from "@react-three/drei";
import type { Color } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";
import type { Value } from "~/types";
import { renderValue } from "~/utils";

type BallProps = StaticBallProps & {
  id: number;
  ghost?: boolean;
};

type StaticBallProps = JSX.IntrinsicElements["group"] & {
  value: Value;
  color?: Color;
  ghost?: boolean;
};

const RADIUS = 0.57;

export function Ball({ id, value, color, ghost, ...props }: BallProps) {
  // Ghost ball doesn't take part in the physics simulation.
  if (ghost) {
    return <StaticBall value={value} color={color} ghost={ghost} {...props} />;
  }
  return (
    <group {...props}>
      <RigidBody name="ball" colliders={false} userData={{ id }}>
        <BallCollider args={[RADIUS]} />
        <StaticBall value={value} color={color} ghost={ghost} />
      </RigidBody>
    </group>
  );
}

function StaticBall({ value, color, ghost, ...props }: StaticBallProps) {
  return (
    <group {...props}>
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0]}
        fontSize={0.25}
        fillOpacity={ghost ? 0.3 : 1}
      >
        {renderValue(value)}
      </Text>
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
