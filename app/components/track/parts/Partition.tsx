import { useObservableCallback } from "observable-hooks";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  delayWhen,
  filter,
  ignoreElements,
  merge,
  partition,
  share,
  tap,
} from "rxjs";
import { BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import { useStore } from "~/store";
import type { Ball, OperatorBuilder } from "~/types";
import { Tunnel } from "../../elements/Tunnel";
import type { Part, TrackPart } from "../parts";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls and their incoming speed.
*/

type Props = {
  track: TrackPart<Part.Partition>;
};

export const Partition = forwardRef(function Partition(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const {
    predicate = Boolean,
    displayText,
    trueLabel,
    falseLabel,
  } = track.props ?? {};
  const [onDetect, detection$] = useObservableCallback<Ball>();
  const removeBall = useStore((state) => state.removeBall);

  /* Builder */

  const trueFactory = useRef<OperatorBuilder>(null!);
  const falseFactory = useRef<OperatorBuilder>(null!);

  const trueTail = useRef<OperatorBuilder>(null!);
  const falseTail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return (source$) => {
          const [true$, false$] = partition(
            source$.pipe(
              delayWhen(({ ballId }) =>
                detection$.pipe(
                  filter(({ id }) => id === ballId),
                  tap(({ id }) => removeBall(id))
                )
              ),
              share()
            ),
            (boxedValue, index) => predicate(boxedValue.value, index)
          );
          return merge(
            true$.pipe(
              trueFactory.current.build(),
              trueTail.current.build(),
              ignoreElements()
            ),
            false$.pipe(
              falseFactory.current.build(),
              falseTail.current.build(),
              ignoreElements()
            )
          );
        };
      },
    }),
    [predicate, detection$, removeBall]
  );

  return (
    <group>
      <Tunnel onBallDetection={onDetect} displayText={displayText} exitClosed />
      <group position={[2, 0, 0]}>
        <group position={[0, 0, -2]}>
          <Factory ref={falseFactory} displayText={falseLabel} hidePlumbob />
          <group position={[2, 0, 0]}>
            <BuildTail ref={falseTail} track={track.falseTail} />
          </group>
        </group>
        <group position={[0, 0, 2]}>
          <Factory ref={trueFactory} displayText={trueLabel} hidePlumbob />
          <group position={[2, 0, 0]}>
            <BuildTail ref={trueTail} track={track.trueTail} />
          </group>
        </group>
      </group>
    </group>
  );
});
