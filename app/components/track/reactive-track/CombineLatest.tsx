import { Center } from "@react-three/drei";
import type { ForwardedRef } from "react";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Subject, combineLatest, ignoreElements, mergeWith } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { Build, BuildTail } from "~/components/Build";
import { useStore } from "~/store";
import type { ObservableBuilder, OperatorBuilder, Value } from "~/types";
import { renderValue } from "~/utils";
import { Base } from "../elements/Base";
import type { TrackPart } from "../parts";
import { Part } from "../parts";
import { Bucket } from "../parts/Bucket";
import { Producer } from "./Producer";

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

  const tail = useRef<OperatorBuilder>(null!);
  const a = useRef<ObservableBuilder>(null!);
  const b = useRef<ObservableBuilder>(null!);
  const producer = useRef<ObservableBuilder>(null!);

  const [valueA, setValueA] = useState<Value>();
  const [valueB, setValueB] = useState<Value>();

  const removeBall = useStore((state) => state.removeBall);
  const subject$ = useMemo(() => new Subject<Value>(), []);

  const handleA: BallDetectionHandler = (ball) => {
    setValueA(ball.value);
    removeBall(ball.id);
    if (valueB !== undefined) {
      subject$.next([ball.value, valueB]);
    }
  };

  const handleB: BallDetectionHandler = (ball) => {
    setValueB(ball.value);
    removeBall(ball.id);
    if (valueA !== undefined) {
      subject$.next([valueA, ball.value]);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      build() {
        const A$ = a.current.build();
        const B$ = b.current.build();
        const tailOperator = tail.current.build();
        const producer$ = producer.current.build();
        return combineLatest([A$, B$]).pipe(
          mergeWith(producer$.pipe(ignoreElements())),
          tailOperator
        );
      },
    }),
    []
  );

  return (
    <group position={[0, 0, 0]}>
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
          <Producer
            ref={producer}
            track={{
              part: Part.Producer,
              props: {
                source$: subject$,
                displayText: displayText ?? "combineLatest(A, B)",
              },
              tail: null,
            }}
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
