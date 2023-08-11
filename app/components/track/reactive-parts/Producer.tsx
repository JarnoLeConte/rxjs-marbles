import { useEffect, useRef, useState } from "react";
import { type Observable } from "rxjs";
import { Vector3 } from "three";
import { Render } from "~/components/Render";
import { useGameStore } from "~/store";
import type { Track, Value } from "~/types";
import { Begin } from "../parts/Begin";

type Props = {
  subscribed?: boolean; //  controller subscription
  source$?: Observable<Value>;
  displayText?: string;
  next?: Track;
};

export function Producer({ subscribed, next, source$, displayText }: Props) {
  const addBall = useGameStore((state) => state.addBall);
  const updateActivity = useGameStore((state) => state.updateActivity);
  const ref = useRef<THREE.Group>(null!);

  const [localSubscribed, setSubscribed] = useState(false);
  subscribed = subscribed ?? localSubscribed;

  // Every tick, check if a ball needs to be created by the producer
  useEffect(() => {
    if (!source$ || !subscribed) return;

    const sub = source$.subscribe((value) => {
      updateActivity();

      // Initial ball ppsition
      const position = ref.current
        .localToWorld(new Vector3(1, 1.5, 0)) // start from inside the wall to give the ball a push
        .toArray();

      // Create the ball
      addBall({ value, position });
    });

    return () => sub.unsubscribe();
  }, [source$, subscribed, addBall, updateActivity]);

  return (
    <group ref={ref}>
      <Begin displayText={displayText ?? `source$.pipe(`} />
      {next && (
        <group position={[2, 0, 0]}>
          <Render track={next} onSubscribe={() => setSubscribed(true)} />
        </group>
      )}
    </group>
  );
}
