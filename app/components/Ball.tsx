import { Sphere, Text } from "@react-three/drei";
import type { Color } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";

type Props = JSX.IntrinsicElements["group"] & {
  id: number;
  value: any;
  color?: Color;
};

export function Ball({ id, value, color, ...props }: Props) {
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
          fontSize={0.3}
        >
          {value}
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
