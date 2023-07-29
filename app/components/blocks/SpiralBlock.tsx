import { Center } from "@react-three/drei";
import { Base } from "./Base";

export function SpiralBlock(props: JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      <Center rotation-y={Math.PI / 2}>
        <Base block="Cube680" />
        <Base block="Cube026" position-z={1} />
      </Center>
    </group>
  );
}
