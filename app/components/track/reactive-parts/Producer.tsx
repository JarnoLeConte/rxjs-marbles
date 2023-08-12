import { useEffect, useRef } from "react";
import type { Observable } from "rxjs";
import { Vector3 } from "three";
import { useGameStore } from "~/store";
import type { Value } from "~/types";
import { Begin } from "../parts/Begin";
import { delayInBetween } from "~/observables/delayInBetween";

type Props = JSX.IntrinsicElements["group"] & {
  source$?: Observable<Value>;
  displayText?: string;
};

export function Producer({ source$, displayText, ...props }: Props) {
  const addBall = useGameStore((state) => state.addBall);
  const updateActivity = useGameStore((state) => state.updateActivity);
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
