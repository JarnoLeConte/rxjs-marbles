import { Circle } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { DoubleSide } from "three";

type Props = JSX.IntrinsicElements["group"];

export function Stopper({ ...props }: Props) {
  return (
    <group {...props}>
      <RigidBody>
        <Circle args={[0.61]} rotation-y={Math.PI / 2}>
          <meshStandardMaterial
            color="gray"
            metalness={0.5}
            roughness={1}
            transparent
            opacity={0.6}
            side={DoubleSide}
          />
        </Circle>
      </RigidBody>
    </group>
  );
}
