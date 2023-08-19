import { Center } from "@react-three/drei";
import type { ForwardedRef } from "react";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Subject, combineLatest, delayWhen } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { Build, BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import { useStore } from "~/store";
import type { ObservableBuilder, OperatorBuilder, Value } from "~/types";
import { renderValue } from "~/utils";
import { Base } from "../../elements/Base";
import { Bucket } from "../../elements/Bucket";
import type { Part, TrackPart } from "../parts";

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
  const detectionA$ = useMemo(() => new Subject<void>(), []);
  const detectionB$ = useMemo(() => new Subject<void>(), []);
  const [valueA, setValueA] = useState<Value>();
  const [valueB, setValueB] = useState<Value>();

  /* Handlers */

  const handleA: BallDetectionHandler = (ball) => {
    setValueA(ball.value);
    removeBall(ball.id);
    detectionA$.next();
  };

  const handleB: BallDetectionHandler = (ball) => {
    setValueB(ball.value);
    removeBall(ball.id);
    detectionB$.next();
  };

  /* Builder */

  const a = useRef<ObservableBuilder>(null!);
  const b = useRef<ObservableBuilder>(null!);
  const factory = useRef<OperatorBuilder>(null!);
  const tail = useRef<OperatorBuilder>(null!);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        const A$ = a.current.build().pipe(delayWhen(() => detectionA$));
        const B$ = b.current.build().pipe(delayWhen(() => detectionB$));
        return combineLatest([A$, B$]).pipe(
          factory.current.build(),
          tail.current.build()
        );
      },
    }),
    []
  );

  return (
    <group>
      <group>
        <Bucket
          position={[0, 0, 0]}
          content={valueA !== undefined ? renderValue(valueA) : "?"}
          contentLabel="memory"
          onBallDetection={handleA}
        />
        <Base position={[0, -3, 0]} />
        <Bucket
          position={[2, 0, -2]}
          content={valueB !== undefined ? renderValue(valueB) : "?"}
          contentLabel="memory"
          onBallDetection={handleB}
        />
        <Base position={[2, -3, -2]} />
        <group position={[2, -3, 0]}>
          <Factory
            ref={factory}
            displayText={displayText ?? "combineLatest(A, B)"}
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
