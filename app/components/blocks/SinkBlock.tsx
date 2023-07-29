import { LoggerBlock } from "./LoggerBlock";
import { HoleBlock } from "./HoleBlock";
import { Center } from "@react-three/drei";

type Props = JSX.IntrinsicElements["group"] & {
  text?: string;
};

export function SinkBlock({ text, ...props }: Props) {
  return (
    <group {...props}>
      <Center>
        <HoleBlock text={text ?? ").subscribe();"} />
        <LoggerBlock position={[0, -1.5, 0]} />
      </Center>
    </group>
  );
}
