import { RightJoin } from "../parts/RightJoin";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls and their incoming speed.
*/

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
