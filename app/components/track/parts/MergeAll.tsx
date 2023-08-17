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
import {
  NEVER,
  Subject,
  delay,
  ignoreElements,
  mergeAll,
  mergeMap,
  mergeWith,
  pipe,
} from "rxjs";
import type { BallDetectionHandler } from "~/components/BallDetector";
import { BuildTail } from "~/components/Build";
import { useStore } from "~/store";
import type {
  ObservableBuilder,
  OperatorBuilder,
  TaggedObservable,
} from "~/types";
import { assertObservable, isTaggedObservable } from "~/utils";
import type { TrackPart } from "../parts";
import { Part } from "../parts";
import { Tunnel } from "../../elements/Tunnel";
import { Producer } from "./Producer";

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

  const tail = useRef<OperatorBuilder>(null!);
  const producers = useRef<RefObject<ObservableBuilder>[]>([]);
  const sourceAdded$ = useMemo(() => new Subject<void>(), []);

  // Keep track of the active producers which are currently emitting balls
  // and being merged
  const [observables, setObservables] = useState<TaggedObservable[]>([]);

  useEffect(() => {
    sourceAdded$.next();
  }, [observables.length, sourceAdded$]);

  const onBallDetection: BallDetectionHandler = (ball) => {
    if (!isTaggedObservable(ball.value)) {
      console.error(`Expected a tagged observable, but got ${ball.value}.`);
      return;
    }
    const { observable$, label } = ball.value;

    // Modify the ticks inside the producer to start counting from the current tick
    const observable: TaggedObservable = {
      label,
      observable$: observable$.pipe(delay(observables.length * 750)),
    };

    // Add the producer to the list of blocks
    producers.current.push(createRef<ObservableBuilder>());
    setObservables((observables) => [...observables, observable]);

    // Remove icoming ball
    removeBall(ball.id);
  };

  useImperativeHandle(
    ref,
    () => ({
      build() {
        const tailOperator = tail.current.build();
        return pipe(
          mergeWith(
            sourceAdded$.pipe(
              mergeMap(
                (_, index) =>
                  producers.current[index]?.current?.build() ?? NEVER
              ),
              ignoreElements()
            )
          ),
          assertObservable(),
          mergeAll(),
          tailOperator
        );
      },
    }),
    [sourceAdded$]
  );

  return (
    <group>
      <group>
        <Tunnel
          onBallDetection={onBallDetection}
          displayText={displayText ?? "mergeAll(),"}
          exitClosed
        />
        {observables.map(({ observable$, label }, index) => (
          <group key={index} position={[0, 2 + index * 2, 0]}>
            <Producer
              ref={producers.current[index]}
              track={{
                part: Part.Producer,
                props: {
                  source$: observable$,
                  displayText: label,
                },
                tail: null,
              }}
            />
          </group>
        ))}
      </group>
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
