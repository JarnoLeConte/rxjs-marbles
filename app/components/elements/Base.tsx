import { Element } from "./Element";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function Base({ displayText, ...props }: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Element name="Cube019" support />
      </group>
    </group>
  );
}
