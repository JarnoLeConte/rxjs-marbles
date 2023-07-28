import { LoggerBlock } from "./LoggerBlock";
import { HoleBlock } from "./HoleBlock";

type Props = JSX.IntrinsicElements["group"] & {
  text?: string;
};

export function SinkBlock({ text, ...props }: Props) {
  return (
    <group {...props}>
      <HoleBlock text={text ?? ").subscribe();"} />
      <LoggerBlock position={[0, -2, 0]} />
    </group>
  );
}
