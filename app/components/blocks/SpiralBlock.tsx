import { Center } from "@react-three/drei";
import { Base } from "../Base";

export function SpiralBlock(props: JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      <Center rotation-y={Math.PI / 2}>
        <Base element="Cube680" />
        <Base element="Cube026" position-z={1} />
      </Center>
    </group>
  );
}
