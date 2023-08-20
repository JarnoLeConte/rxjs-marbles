import type { ForwardedRef, RefObject } from "react";
import {
  createRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Observable } from "rxjs";
import {
  Subject,
  delay,
  delayWhen,
  mergeMap,
  pipe,
  tap,
  throwError,
} from "rxjs";
import { BuildTail } from "~/components/Build";
import { Factory } from "~/components/elements/Factory";
import { useStore } from "~/store";
import type { Ball, Boxed, OperatorBuilder, Value } from "~/types";
import { assertBoxedObservable } from "~/utils";
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
  const detection$ = useMemo(() => new Subject<Ball>(), []);

  // Keep track of the active producers which are currently emitting balls
  // and being merged
  const [observables, setObservables] = useState<
    Boxed<Observable<Boxed<Value>>>[]
  >([]);

  /* Builder */

  const tail = useRef<OperatorBuilder>(null!);
  const factories = useRef<RefObject<OperatorBuilder>[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return pipe(
          assertBoxedObservable(),
          delayWhen((boxedObservable) =>
            detection$.pipe(
              tap((ball) => {
                factories.current.push(createRef<OperatorBuilder>());
                setObservables((observables) => [
                  ...observables,
                  boxedObservable,
                ]);
                removeBall(ball.id);
              }),
              delay(0)
            )
          ),
          mergeMap(({ value: source$ }, index) => {
            const factory = factories.current[index];
            const factoryOperator = factory.current?.build();
            if (!factoryOperator) {
              return throwError(
                () => new Error(`Factory operator is not defined.`)
              );
            }
            return source$.pipe(
              delay(index * 120),
              factoryOperator,
              tail.current.build()
            );
          })
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
