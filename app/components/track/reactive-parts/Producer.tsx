import { useEffect, useRef } from "react";
import type { Observable } from "rxjs";
import { Vector3 } from "three";
import { useStore } from "~/store";
import type { Value } from "~/types";
import { Begin } from "../parts/Begin";
import { delayInBetween } from "~/observables/delayInBetween";

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
};

export function Producer({ source$, displayText, ...props }: Props) {
  const addBall = useStore((state) => state.addBall);
  const updateActivity = useStore((state) => state.updateActivity);
  const ref = useRef<THREE.Group>(null!);

  // Every tick, check if a ball needs to be created by the producer
  useEffect(() => {
    if (!source$) return;

    const sub = source$.pipe(delayInBetween(1250)).subscribe((value) => {
      updateActivity();
      // Initial ball ppsition
      const position = ref.current
        .localToWorld(new Vector3(1, 1.5, 0)) // start from inside the wall to give the ball a push
        .toArray();
      // Create the ball
      addBall({ value, position });
    });

    return () => sub.unsubscribe();
  }, [source$, addBall, updateActivity]);

  return (
    <group ref={ref} {...props}>
      <Begin displayText={displayText ?? `source$.pipe(`} />
    </group>
  );
}
