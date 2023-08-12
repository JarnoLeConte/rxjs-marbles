import { useCallback, useEffect, useRef } from "react";
import { delayWhen, filter, map, tap, type Observable } from "rxjs";
import { Vector3 } from "three";
import { delayInBetween } from "~/observables/delayInBetween";
import { frame$ } from "~/observables/frame$";
import { useStore } from "~/store";
import type { Value } from "~/types";
import { Begin } from "../parts/Begin";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls being produced in the current frame.

  Values that are emitted within the same frame are delayed
  to make them appear one after the other.
*/

type Props = JSX.IntrinsicElements["group"] & {
  source$?: Observable<Value>;
  displayText?: string;
  waitForFrame?: boolean;
};

export function Producer({
  source$,
  displayText,
  waitForFrame,
  ...props
}: Props) {
  const addBall = useStore((state) => state.addBall);
  const updateBall = useStore((state) => state.updateBall);
  const updateActivity = useStore((state) => state.updateActivity);
  const ref = useRef<THREE.Group>(null!);

  const newBall = useCallback(
    (value: Value) => {
      updateActivity();

      // Initial ball position
      const position = ref.current
        .localToWorld(new Vector3(1, 1.5, 0)) // start from inside the wall to give the ball a push
        .toArray();

      // Create the ball
      const id = addBall({ value, position, ghost: waitForFrame });

      return id;
    },
    [updateActivity, addBall, waitForFrame]
  );

  // Every tick, check if a ball needs to be created by the producer
  useEffect(() => {
    if (!source$) return;

    const sub = source$
      .pipe(
        delayInBetween(1250),
        map((value) => newBall(value)),
        filter((val) => !!waitForFrame), // execute rest of the pipe only if waitForFrame is true
        delayWhen(() => frame$),
        delayInBetween(1250),
        tap((id) => updateBall(id, (ball) => ({ ...ball, ghost: false })))
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [source$, newBall, updateBall, waitForFrame]);

  return (
    <group ref={ref} {...props}>
      <Begin displayText={displayText ?? `source$.pipe(`} />
    </group>
  );
}
