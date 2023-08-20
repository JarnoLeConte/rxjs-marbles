import { Circle } from "@react-three/drei";
import { RigidBody, interactionGroups } from "@react-three/rapier";
import { DoubleSide } from "three";
import { CollisionGroup } from "~/utils";

type Props = JSX.IntrinsicElements["group"];

export function Stopper({ ...props }: Props) {
  return (
    <group {...props}>
      <RigidBody
        collisionGroups={interactionGroups(CollisionGroup.Detector, [
          CollisionGroup.Ball,
        ])}
      >
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
