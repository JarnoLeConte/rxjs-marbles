import { useObservableCallback } from "observable-hooks";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  concatAll,
  concatMap,
  defer,
  delayWhen,
  filter,
  finalize,
  map,
  pipe,
  tap,
} from "rxjs";
import { BuildTail } from "~/components/Build";
import { DownHill } from "~/components/elements/DownHill";
import { Factory } from "~/components/elements/Factory";
import { when } from "~/observables/when";
import { useStore } from "~/store";
import type { Ball, OperatorBuilder } from "~/types";
import { assertBoxedObservable, makeCodeOperator, unbox } from "~/utils";
import { Tunnel } from "../../elements/Tunnel";
import type { Part, TrackPart } from "../parts";
import type { Color } from "@react-three/fiber";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of incoming balls and balls being produced.
*/

type Props = {
  track: TrackPart<Part.ConcatAll>;
};

export const ConcatAll = forwardRef(function ConcatAll(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);
  const updateBall = useStore((state) => state.updateBall);
  const [onEnter, enter$] = useObservableCallback<Ball>();
  const [onBeforeEnter, beforeEnter$] = useObservableCallback<Ball>();
  const [isClosed, setIsClosed] = useState(false);
  const [label, setLabel] = useState<string>();
  const [color, setColor] = useState<Color>();

  /* Builder */

  const factory = useRef<OperatorBuilder>(null!);
  const tail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      code() {
        return makeCodeOperator("concatAll", [], tail.current);
      },
      operator() {
        return pipe(
          assertBoxedObservable(),
          map(unbox),
          concatAll(),
          tail.current.operator()
        );
      },
      build() {
        return pipe(
          delayWhen(({ ballId }) =>
            beforeEnter$.pipe(filter(({ id }) => id === ballId))
          ),
          assertBoxedObservable(),
          tap(({ ballId }) =>
            updateBall(ballId!, (ball) => ({ ...ball, ghost: true }))
          ),
          concatMap(({ ballId, value: source$, label, color }) =>
            defer(() => {
              updateBall(ballId!, (ball) => ({ ...ball, ghost: false }));
              return when(enter$, ({ id }) => {
                setIsClosed(true);
                setLabel(label);
                setColor(color);
                removeBall(id);
                return source$.pipe(
                  map((boxedValue) => ({ ...boxedValue, color })),
                  factory.current.build(),
                  finalize(() => {
                    setIsClosed(false);
                    setLabel(undefined);
                  })
                );
              });
            })
          ),
          tail.current.build()
        );
      },
    }),
    [enter$, beforeEnter$, removeBall, updateBall]
  );

  return (
    <group>
      <DownHill onBeforeExit={onBeforeEnter} />
      <group position={[4, -1, 0]}>
        <Tunnel
          onBallDetection={onEnter}
          displayText={displayText ?? "concatAll"}
          entryClosed={isClosed}
          exitClosed
        />
        <group position={[0, 2, 0]} visible={!!label}>
          <Factory
            ref={factory}
            displayText={label}
            textBackgroundColor={color}
            hidePlumbob
          />
        </group>
        <group position={[2, 0, 0]}>
          <BuildTail ref={tail} track={track.tail} />
        </group>
      </group>
    </group>
  );
});
