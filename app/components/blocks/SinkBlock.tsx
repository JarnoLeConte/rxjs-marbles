import { Text } from "@react-three/drei";
import { Base } from "./Base";

export function SinkBlock(props: JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      <Base block="Cube703" rotation-y={Math.PI} />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.5, 1]}
        fontSize={0.2}
      >
        ).subscribe();
      </Text>
    </group>
  );
}
