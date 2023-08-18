import type { ForwardedRef, RefObject } from "react";
import {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Subject, delay, delayWhen, mergeMap, pipe, throwError } from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import { useStore } from "~/store";
import type { OperatorBuilder, TaggedObservable } from "~/types";
import { assertTaggedObservable, isTaggedObservable } from "~/utils";
import { Tunnel } from "../../elements/Tunnel";
import type { Part, TrackPart } from "../parts";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of incoming balls and balls being produced.

  Values that are emitted within the same frame are delayed
  to make them appear one after the other. Though, we do preserve the order
  in which producers emit.
*/

type Props = {
  track: TrackPart<Part.MergeAll>;
};

export const MergeAll = forwardRef(function MergeAll(
  { track }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const { displayText } = track.props ?? {};
  const removeBall = useStore((state) => state.removeBall);
  const detection$ = useMemo(() => new Subject<void>(), []);

  // Keep track of the active producers which are currently emitting balls
  // and being merged
  const [observables, setObservables] = useState<TaggedObservable[]>([]);

  useEffect(() => {
    if (observables.length > 0) {
      detection$.next();
    }
  }, [observables, detection$]);

  /* Handlers */

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (!isTaggedObservable(ball.value)) {
      console.error(`Expected a tagged observable, but got ${ball.value}.`);
      return;
    }

    // Add the producer to the list of blocks
    const taggedObservable = ball.value;
    factories.current.push(createRef<OperatorBuilder>());
    setObservables((observables) => [...observables, taggedObservable]);

    // Remove icoming ball
    removeBall(ball.id);
  };

  /* Builder */

  const tail = useRef<OperatorBuilder>(null!);
  const factories = useRef<RefObject<OperatorBuilder>[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return pipe(
          delayWhen(() => detection$),
          assertTaggedObservable(),
          mergeMap(({ observable$ }, index) => {
            const factory = factories.current[index];
            const factoryOperator = factory.current?.build();
            if (!factoryOperator) {
              return throwError(
                () => new Error(`Factory operator is not defined.`)
              );
            }
            return observable$.pipe(
              delay(index * 750),
              factoryOperator,
              tail.current.build()
            );
          })
        );
      },
    }),
    [detection$]
  );

  return (
    <group>
      <group>
        <Tunnel
          onBallDetection={onBallDetection}
          displayText={displayText ?? "mergeAll(),"}
          exitClosed
        />
        {observables.map(({ label }, index) => (
          <group key={index} position={[0, 2 + index * 2, 0]}>
            <Factory ref={factories.current[index]} displayText={label} />
          </group>
        ))}
      </group>
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
