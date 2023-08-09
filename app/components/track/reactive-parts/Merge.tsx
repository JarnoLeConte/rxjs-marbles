import { RightJoin } from "../parts/RightJoin";

type Props = JSX.IntrinsicElements["group"] & {
  displayText?: string;
};

export function Merge({ displayText, ...props }: Props) {
  return (
    <group {...props}>
      <RightJoin displayText={displayText ?? "mergeWith(...),"} />
    </group>
  );
}
