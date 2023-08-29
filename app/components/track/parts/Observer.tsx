import { useObservableCallback } from "observable-hooks";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { delayWhen, filter, pipe, tap } from "rxjs";
import { useStore } from "~/store";
import type { Ball, OperatorBuilder } from "~/types";
import { makeCodeDefaults } from "~/utils";
import { Bucket } from "../../elements/Bucket";
import type { Part, TrackPart } from "../parts";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  The subscriber component is used for presentation only,
  and does not actually subscribe to the observable, because
  that is currently handled by the runtime.
*/

type Props = {
  track: TrackPart<Part.Subscriber>;
};

export const Observer = forwardRef(function Observer(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);
  const [onDetection, detection$] = useObservableCallback<Ball>();

  const [label, setLabel] = useState<string>();

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
          tap(({ ballId, label }) => {
            setLabel(label);
            removeBall(ballId!);
          })
        );
      },
    }),
    [detection$, removeBall]
  );

  return (
    <group>
      <Bucket
        onBallDetection={onDetection}
        displayText={displayText}
        contentLabel={`observer`}
        content={label ?? "-"}
      />
    </group>
  );
});
