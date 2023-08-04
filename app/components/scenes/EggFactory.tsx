import { RigidBody } from "@react-three/rapier";
import { Chicken } from "../Chicken";
import { Egg } from "../Egg";
import { Hen } from "../Hen";
import { Plane } from "@react-three/drei";
import { EggCup } from "../EggCup";

export function EggFactory() {
  return (
    <group>
      <Egg content={{ type: "number", value: 5 }} />
      <Chicken position-x={-1} />
      <Chicken position-x={-1} position-y={1} />
      <Hen position={[1, 1, 0]} rotation-y={Math.PI / 2} />
      <EggCup position={[-2.2, -3, 0]} />
      <RigidBody type="fixed">
        <group rotation-z={0.2}>
          <Plane
            args={[3.9, 1]}
            position={[0, -2, 0]}
            rotation-x={-Math.PI / 2}
          />
        </group>
      </RigidBody>
    </group>
  );
}
