import { Text } from "@react-three/drei";
import { Base } from "./Base";
import type { IntersectionEnterHandler } from "@react-three/rapier";
import { BallCollider, RigidBody } from "@react-three/rapier";
import { useGameStore } from "~/store";

export function OperatorBlock(props: JSX.IntrinsicElements["group"]) {
  const updateBallValue = useGameStore((state) => state.updateBallValue);

  const onIntersectionEnter: IntersectionEnterHandler = ({ other }) => {
    if (other.rigidBodyObject?.name === "ball") {
      const ballId = other.rigidBodyObject.userData.id;
      updateBallValue(ballId, (x) => x * 2);
    }
  };

  return (
    <group {...props}>
      <Base block="Cube062" position-y={1} rotation-y={Math.PI / 2} />
      <RigidBody type="fixed" colliders={false} sensor>
        <BallCollider args={[0.5]} onIntersectionEnter={onIntersectionEnter} />
      </RigidBody>
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.5, 1]}
        fontSize={0.2}
      >
        {`map((x) => x * 2)`}
      </Text>
    </group>
  );
}
