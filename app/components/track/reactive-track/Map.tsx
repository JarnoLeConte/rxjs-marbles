import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { map, pipe } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { BuildTail } from "~/components/Build";
import { useStore } from "~/store";
import type { OperatorBuilder, Value } from "~/types";
import type { Part, TrackPart } from "../parts";
import { Tunnel } from "../parts/Tunnel";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls and their incoming speed.
*/

type Props = {
  track: TrackPart & { part: Part.Map };
};

export const Map = forwardRef(function Map(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const updateBall = useStore((state) => state.updateBall);
  const [index, setIndex] = useState(0);

  const onBallDetection: BallDetectionHandler = ({ id }) => {
    updateBall(id, (ball) => ({
      ...ball,
      value: track.props.project(ball.value, index),
    }));
    setIndex((count) => count + 1);
  };

  const tailRef = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return pipe(
          map((value: Value, index: number) =>
            track.props.project(value, index)
          ),
          tailRef.current.build()
        );
      },
    }),
    [track]
  );

  return (
    <group>
      <Tunnel
        onBallDetection={onBallDetection}
        displayText={track.props.displayText}
      />
      <group position={[2, 0, 0]}>
        <BuildTail ref={tailRef} track={track.tail} />
      </group>
    </group>
  );
});
