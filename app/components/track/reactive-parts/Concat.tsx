import { RightJoin } from "../parts/RightJoin";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function Concat({ displayText, ...props }: Props) {
  return (
    <group {...props}>
      <RightJoin displayText={displayText ?? "concatWith(...),"} />
    </group>
  );
}
