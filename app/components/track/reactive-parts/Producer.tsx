import { useCallback, useEffect, useRef, useState } from "react";
import { delayWhen, map, mergeMap, of, tap, type Observable } from "rxjs";
import { Vector3 } from "three";
import { delayInBetween } from "~/observables/delayInBetween";
import { frame$ } from "~/observables/frame$";
import { useStore } from "~/store";
import type { Status, Value } from "~/types";
import { Begin } from "../parts/Begin";
import { Plumbob } from "../elements/Plumbob";

/*
  ⚠️ Current implementation differs from rxjs, in that:

  Virtual time is used to perform animations.
  Therefore processing a single frame takes an unknown amount of time,
  it depends on the amount of balls being produced in the current frame.

  Values that are emitted within the same frame are delayed
  to make them appear one after the other.
*/

export type ProducerNotification = Notification;

type Notification = {
  type: Status;
};

type Props = JSX.IntrinsicElements["group"] & {
  source$?: Observable<Value>;
  notifier$?: Observable<Notification>;
  displayText?: string;
  waitForFrame?: boolean;
};

export function Producer({
  source$,
  notifier$,
  displayText,
  waitForFrame,
  ...props
}: Props) {
  const addBall = useStore((state) => state.addBall);
  const updateBall = useStore((state) => state.updateBall);
  const ref = useRef<THREE.Group>(null!);
  const [status, setStatus] = useState<Status>("waiting");

  const newBall = useCallback(
    (value: Value) => {
      // Initial ball position
      const position = ref.current
        .localToWorld(new Vector3(1, 1.5, 0)) // start from inside the wall to give the ball a push
        .toArray();

      // Create the ball
      const id = addBall({ value, position, ghost: true });

      return id;
    },
    [addBall]
  );

  // Every tick, check if a ball needs to be created by the producer
  useEffect(() => {
    if (!source$) return;

    const sub = source$
      .pipe(
        map((value) => newBall(value)),
        mergeMap((id) =>
          waitForFrame ? of(id).pipe(delayWhen(() => frame$)) : of(id)
        ),
        delayInBetween(1250),
        tap((id) => updateBall(id, (ball) => ({ ...ball, ghost: false })))
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [source$, newBall, updateBall, waitForFrame]);

  useEffect(() => {
    if (!notifier$) return;

    const sub = notifier$.subscribe((notification) => {
      switch (notification.type) {
        case "waiting":
        case "active":
        case "complete":
        case "error":
          setStatus(notification.type);
          break;
        default:
          console.error("unknown notification type", notification);
      }
    });

    return () => sub.unsubscribe();
  }, [notifier$]);

  return (
    <group ref={ref} {...props}>
      <Begin displayText={displayText ?? `source$.pipe(`} />
      {notifier$ && <Plumbob position={[1, 2.7, 0]} status={status} />}
    </group>
  );
}
