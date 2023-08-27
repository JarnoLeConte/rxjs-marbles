import { Center } from "@react-three/drei";
import type { ForwardedRef } from "react";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Subject, combineLatest, delayWhen, map, tap } from "rxjs";
import { Build, BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import { useStore } from "~/store";
import type { Ball, ObservableBuilder, OperatorBuilder } from "~/types";
import { Base } from "../../elements/Base";
import { Bucket } from "../../elements/Bucket";
import type { Part, TrackPart } from "../parts";
import { box, renderValue } from "~/utils";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls and their incoming speed.

  This operator is sensitive to the order in which values occur,
  and because in a single animated frame the order is not guaranteed,
  the output can differ from rxjs.
*/

type Props = {
  track: TrackPart<Part.CombineLatest>;
};

export const CombineLatest = forwardRef(function CombineLatest(
  { track }: Props,
  ref: ForwardedRef<ObservableBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);
  const detectionA$ = useMemo(() => new Subject<Ball>(), []);
  const detectionB$ = useMemo(() => new Subject<Ball>(), []);
  const [labelA, setLabelA] = useState<string>("?");
  const [labelB, setLabelB] = useState<string>("?");

  /* Builder */

  const a = useRef<ObservableBuilder>(null!);
  const b = useRef<ObservableBuilder>(null!);
  const factory = useRef<OperatorBuilder>(null!);
  const tail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      observable() {
        const A$ = a.current.observable();
        const B$ = b.current.observable();
        const tailOperator = tail.current.operator();
        return combineLatest([A$, B$]).pipe(
          map(([boxedA, boxedB]) =>
            box({
              value: [boxedA, boxedB],
              label: renderValue([boxedA, boxedB]),
            })
          ),
          tailOperator
        );
      },
      build() {
        const A$ = a.current.build().pipe(
          delayWhen(({ label }) =>
            detectionA$.pipe(
              tap(({ id }) => {
                setLabelA(label);
                removeBall(id);
              })
            )
          )
        );
        const B$ = b.current.build().pipe(
          delayWhen(({ label }) =>
            detectionB$.pipe(
              tap(({ id }) => {
                setLabelB(label);
                removeBall(id);
              })
            )
          )
        );
        return combineLatest([A$, B$]).pipe(
          map(([boxedA, boxedB]) =>
            box({
              value: [boxedA, boxedB],
              label: renderValue([boxedA, boxedB]),
            })
          ),
          factory.current.build(),
          tail.current.build()
        );
      },
    }),
    [detectionA$, detectionB$, removeBall]
  );

  return (
    <group>
      <group>
        <Bucket
          position={[0, 0, 0]}
          content={labelA}
          contentLabel="memory"
          displayText="A"
          onBallDetection={(ball) => detectionA$.next(ball)}
        />
        <Base position={[0, -3, 0]} />
        <Bucket
          position={[2, 0, -2]}
          content={labelB}
          contentLabel="memory"
          displayText="B"
          onBallDetection={(ball) => detectionB$.next(ball)}
        />
        <Base position={[2, -3, -2]} />
        <group position={[2, -3, 0]}>
          <Factory
            ref={factory}
            displayText={displayText ?? "combineLatest(A, B)"}
            hidePlumbob
          />
        </group>
      </group>
      <Center left top>
        <Build ref={a} track={track.incoming[0]} />
      </Center>
      <Center left top position={[2, 0, -2]}>
        <Build ref={b} track={track.incoming[1]} />
      </Center>
      <group position={[4, -3, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
