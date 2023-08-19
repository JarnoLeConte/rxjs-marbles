import type { ForwardedRef } from "react";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Subject, concatMap, finalize, pipe } from "rxjs";
import { BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import { when } from "~/observables/when";
import { useStore } from "~/store";
import type { Ball, OperatorBuilder } from "~/types";
import { assertBoxedObservable } from "~/utils";
import { Tunnel } from "../../elements/Tunnel";
import type { Part, TrackPart } from "../parts";

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
  const detection$ = useMemo(() => new Subject<Ball>(), []);
  const [isClosed, setIsClosed] = useState(false);
  const [label, setLabel] = useState<string | undefined>();

  /* Builder */

  const factory = useRef<OperatorBuilder>(null!);
  const tail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return pipe(
          assertBoxedObservable(),
          concatMap(({ value: source$, label }) =>
            when(detection$, ({ id }) => {
              setIsClosed(true);
              setLabel(label);
              removeBall(id);
              return source$.pipe(
                factory.current.build(),
                finalize(() => {
                  setIsClosed(false);
                  setLabel(undefined);
                })
              );
            })
          ),
          tail.current.build()
        );
      },
    }),
    [detection$, removeBall]
  );

  return (
    <group>
      <group>
        <Tunnel
          onBallDetection={(ball) => detection$.next(ball)}
          displayText={displayText ?? "concatAll(),"}
          entryClosed={isClosed}
          exitClosed
        />
        <group position={[0, 2, 0]}>
          <Factory ref={factory} displayText={label} />
        </group>
      </group>
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
