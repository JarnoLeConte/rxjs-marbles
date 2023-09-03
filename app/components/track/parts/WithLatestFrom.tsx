import { Center } from "@react-three/drei";
import type { ForwardedRef } from "react";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Subject, delayWhen, map, pipe, tap, withLatestFrom } from "rxjs";
import { Build, BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import { useStore } from "~/store";
import type { Ball, ObservableBuilder, OperatorBuilder } from "~/types";
import { box, renderValue } from "~/utils";
import { Base } from "../../elements/Base";
import { Bucket } from "../../elements/Bucket";
import type { Part, TrackPart } from "../parts";

type Props = {
  track: TrackPart<Part.WithLatestFrom>;
};

export const WithLatestFrom = forwardRef(function WithLatestFrom(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);
  const detectionA$ = useMemo(() => new Subject<Ball>(), []);
  const detectionB$ = useMemo(() => new Subject<Ball>(), []);
  const [labelA, setLabelA] = useState<string>("?");
  const [labelB, setLabelB] = useState<string>("?");

  /* Builder */

  const other = useRef<ObservableBuilder>(null!);
  const factory = useRef<OperatorBuilder>(null!);
  const tail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      operator() {
        const other$ = other.current.observable();
        const tailOperator = tail.current.operator();
        return pipe(
          withLatestFrom(other$),
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
        const other$ = other.current.build().pipe(
          delayWhen(({ label }) =>
            detectionB$.pipe(
              tap(({ id }) => {
                setLabelB(label);
                removeBall(id);
              })
            )
          )
        );

        return pipe(
          delayWhen(({ label }) =>
            detectionA$.pipe(
              tap(({ id }) => {
                setLabelA(label);
                removeBall(id);
              })
            )
          ),
          withLatestFrom(other$),
          map(([boxedA, boxedB]) =>
            box({
              value: [boxedA, boxedB],
              label: renderValue([boxedA, boxedB]),
              color: boxedA.color,
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
            displayText={displayText ?? "withLatestFrom(B)"}
            hidePlumbob
          />
        </group>
      </group>
      <Center left top position={[2, 0, -2]}>
        <Build ref={other} track={track.other} />
      </Center>
      <group position={[4, -3, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
