import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { useStore } from "~/store";
import type { OperatorBuilder } from "~/types";
import { Bucket } from "../../elements/Bucket";
import type { Part, TrackPart } from "../parts";
import { Identity } from "./Identity";

type Props = {
  track: TrackPart<Part.PreviewObserver>;
};

export const PreviewObserver = forwardRef(function PreviewObserver(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);

  const onBallDetection: BallDetectionHandler = (ball) => {
    removeBall(ball.id);
  };

  return (
    <group>
      <Bucket
        onBallDetection={onBallDetection}
        contentLabel="observable"
        content={displayText}
      />
      <Identity ref={ref} />
    </group>
  );
});
