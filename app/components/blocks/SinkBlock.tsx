import { Text } from "@react-three/drei";
import { Base } from "./Base";
import { LoggerBlock } from "./LoggerBlock";

type Props = JSX.IntrinsicElements["group"] & {
  logger?: boolean;
  text?: React.ReactNode;
};

export function SinkBlock({ logger, text, ...props }: Props) {
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
        {text ?? `).subscribe();`}
      </Text>
      {logger && <LoggerBlock position={[0, -1, 0]} />}
    </group>
  );
}
