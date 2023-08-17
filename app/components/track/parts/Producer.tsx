import type { ForwardedRef } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Observable } from "rxjs";
import { BehaviorSubject, defer, finalize, map, switchMap, tap } from "rxjs";
import { Vector3 } from "three";
import { BuildTail } from "~/components/Build";
import { delayInBetween } from "~/observables/delayInBetween";
import { useStore } from "~/store";
import type {
  ObservableBuilder,
  OperatorBuilder,
  Status,
  Value,
} from "~/types";
import { Plumbob } from "../../elements/Plumbob";
import type { Part, TrackPart } from "../parts";
import { Begin } from "../../elements/Begin";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls being produced in the current frame.

  Values that are emitted within the same frame are delayed
  to make them appear one after the other.
*/

type Props = {
  track: TrackPart<Part.Producer>;
};

export const Producer = forwardRef(function Producer(
  { track }: Props,
  ref: ForwardedRef<ObservableBuilder>
) {
  const { displayText, source$ } = track.props;
  const addBall = useStore((state) => state.addBall);
  const updateBall = useStore((state) => state.updateBall);

  const tail = useRef<OperatorBuilder>(null!);
  const root = useRef<THREE.Group>(null!);

  const [status, setStatus] = useState<Status>("waiting");

  const sourceProvider$ = useMemo(
    () => new BehaviorSubject<Observable<Value>>(source$),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Listen to source$ changes
  // and pass the new source to the provider
  useEffect(() => {
    if (sourceProvider$.value !== source$) {
      sourceProvider$.next(source$);
    }
  }, [source$, sourceProvider$]);

  const newBall = useCallback(
    (value: Value) => {
      // Initial ball position
      const position = root.current
        .localToWorld(new Vector3(1, 1.5, 0)) // start from inside the wall to give the ball a push
        .toArray();

      // Create the ball
      const id = addBall({ value, position, ghost: true });

      return id;
    },
    [addBall]
  );

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return sourceProvider$.pipe(
          switchMap((source$) =>
            defer(() => {
              setStatus("active");
              return source$.pipe(finalize(() => setStatus("complete")));
            })
          ),
          map((value) => ({ value, id: newBall(value) })),
          delayInBetween(1250),
          tap(({ id }) =>
            updateBall(id, (ball) => ({ ...ball, ghost: false }))
          ),
          map(({ value }) => value),
          tail.current.build()
        );
      },
    }),
    [sourceProvider$, newBall, updateBall]
  );

  return (
    <group ref={root}>
      <Begin displayText={displayText ?? `source$.pipe(`} />
      <Plumbob position={[1, 2.7, 0]} status={status} />
      <group position={[2, 0, 0]}>
        <BuildTail ref={tail} track={track.tail} />
      </group>
    </group>
  );
});
