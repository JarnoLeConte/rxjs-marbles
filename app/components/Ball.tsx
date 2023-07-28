import { Sphere, Text } from "@react-three/drei";
import { BallCollider, RigidBody } from "@react-three/rapier";

type Props = JSX.IntrinsicElements["group"] & {
  id: number;
  value: any;
};

export function Ball({ id, value, ...props }: Props) {
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
            color={0xff0000}
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
