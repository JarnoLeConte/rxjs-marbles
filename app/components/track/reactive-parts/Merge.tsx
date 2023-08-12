import { RightJoin } from "../parts/RightJoin";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls and their incoming speed.

  Within a single frame it is first-in-first-out,
  probably interweaving emitted values from source A and source B,
  while in rxjs the observables sources are processed in order.
*/

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
