import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { Subject, delayWhen, map, pipe, tap } from "rxjs";
import { BuildTail } from "~/components/Build";
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
  track: TrackPart<Part.Map>;
};

export const Map = forwardRef(function Map(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { project, displayText, projectionText } = track.props;
  const updateBall = useStore((state) => state.updateBall);
  const detection$ = useMemo(() => new Subject<Ball>(), []);

  /* Builder */

  const tail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      operator() {
        return pipe(
          map((boxedValue, index) => ({
            ...boxedValue,
            ...project(boxedValue.value, index),
          })),
          tail.current.operator()
        );
      },
      build() {
        return pipe(
          delayWhen(() => detection$),
          map((boxedValue, index) => ({
            ...boxedValue,
            ...project(boxedValue.value, index),
          })),
          tap((boxedValue) => {
            const { ballId, label } = boxedValue;
            if (!ballId) {
              return console.error("Ball id is missing");
            }
            updateBall(ballId, (ball) => ({ ...ball, label }));
          }),
          tail.current.build()
        );
      },
    }),
    [project, detection$, updateBall]
  );

  return (
    <group>
      <Tunnel
        onBallDetection={(ball) => detection$.next(ball)}
        displayText={displayText ?? "map"}
        upperText={projectionText}
      />
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
