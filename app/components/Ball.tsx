import { Sphere, Text } from "@react-three/drei";
import type { Color } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";
import type { BallContent } from "~/types";
import { renderValue } from "~/utils";

type Props = JSX.IntrinsicElements["group"] & {
  id: number;
  content: BallContent;
  color?: Color;
};

export function Ball({ id, content, color, ...props }: Props) {
  const radius = 0.57;

  return (
    <group {...props} dispose={null}>
      <RigidBody name="ball" colliders={false} userData={{ id }}>
        <BallCollider args={[radius]} />
        <Text
          color="black"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0]}
          fontSize={0.25}
        >
          {renderValue(content)}
        </Text>
        <Sphere args={[radius]}>
          <meshStandardMaterial
            color={color}
            metalness={1}
            roughness={0}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </RigidBody>
    </group>
  );
}
