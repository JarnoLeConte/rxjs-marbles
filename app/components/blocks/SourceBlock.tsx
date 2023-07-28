import { Text } from "@react-three/drei";
import { Base } from "./Base";

export function SourceBlock(props: JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      <Base block="Cube023" position={[0, 0, 0]} />
      <Base block="Cube023" position={[0, 2, 0]} rotation-x={Math.PI} />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.5, 1]}
        fontSize={0.2}
      >
        source$.pipe(
      </Text>
    </group>
  );
}
