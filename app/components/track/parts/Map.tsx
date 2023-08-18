import type { ForwardedRef } from "react";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Subject, delayWhen, map, pipe } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { BuildTail } from "~/components/Build";
import { useStore } from "~/store";
import type { Ball, OperatorBuilder, Value } from "~/types";
import type { Part, TrackPart } from "../parts";
import { Tunnel } from "../../elements/Tunnel";

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
  const { project, displayText } = track.props;
  const updateBall = useStore((state) => state.updateBall);
  const detection$ = useMemo(() => new Subject<Ball>(), []);
  const [index, setIndex] = useState(0);

  /* Handlers */

  const onBallDetection: BallDetectionHandler = (ball) => {
    const { id } = ball;
    updateBall(id, (ball) => ({
      ...ball,
      value: project(ball.value, index),
    }));
    setIndex((count) => count + 1);
    detection$.next(ball);
  };

  /* Builder */

  const tail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return pipe(
          delayWhen(() => detection$),
          map((value: Value, index: number) => project(value, index)),
          tail.current.build()
        );
      },
    }),
    [project, detection$]
  );

  return (
    <group>
      <Tunnel onBallDetection={onBallDetection} displayText={displayText} />
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});