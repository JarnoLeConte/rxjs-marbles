import { useEffect, useRef } from "react";
import { EMPTY, mergeMap, of, type Observable } from "rxjs";
import { Vector3 } from "three";
import { notification$ } from "~/observables/notification$";
import { useGameStore } from "~/store";
import type { Value } from "~/types";
import { Begin } from "../parts/Begin";

type Props = JSX.IntrinsicElements["group"] & {
  name: string;
  source$?: Observable<Value>;
  displayText?: string;
};

export function Producer({ name, displayText, ...props }: Props) {
  const addBall = useGameStore((state) => state.addBall);
  const updateActivity = useGameStore((state) => state.updateActivity);
  const ref = useRef<THREE.Group>(null!);

  // Every tick, check if a ball needs to be created by the producer
  useEffect(() => {
    const sub = notification$
      .pipe(
        mergeMap((notification) =>
          notification.type === "emit" && notification.producer === name
            ? of(notification.value)
            : EMPTY
        )
      )
      .subscribe((value) => {
        updateActivity();

        // Initial ball ppsition
        const position = ref.current
          .localToWorld(new Vector3(1, 1.5, 0)) // start from inside the wall to give the ball a push
          .toArray();

        // Create the ball
        addBall({ value, position });
      });

    return () => sub.unsubscribe();
  }, [name, addBall, updateActivity]);

  return (
    <group ref={ref} {...props}>
      <Begin displayText={displayText ?? `source$.pipe(`} />
    </group>
  );
}
