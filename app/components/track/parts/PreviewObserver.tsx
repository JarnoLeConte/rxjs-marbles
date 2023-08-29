import { useObservableCallback } from "observable-hooks";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { delayWhen, filter, pipe, tap } from "rxjs";
import { useStore } from "~/store";
import type { Ball, OperatorBuilder } from "~/types";
import { makeCodeDefaults } from "~/utils";
import { Bucket } from "../../elements/Bucket";
import type { Part, TrackPart } from "../parts";

type Props = {
  track: TrackPart<Part.PreviewObserver>;
};

export const PreviewObserver = forwardRef(function PreviewObserver(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);
  const [onDetection, detection$] = useObservableCallback<Ball>();

  useImperativeHandle(
    ref,
    () => ({
      code() {
        return makeCodeDefaults();
      },
      operator() {
        return pipe();
      },
      build() {
        return pipe(
          delayWhen(({ ballId }) =>
            detection$.pipe(filter((ball) => ball.id === ballId))
          ),
          tap(({ ballId }) => removeBall(ballId!))
        );
      },
    }),
    [detection$, removeBall]
  );

  return (
    <group>
      <Bucket
        onBallDetection={onDetection}
        contentLabel="observable"
        content={displayText}
      />
    </group>
  );
});
