import type { Color } from "@react-three/fiber";
import { useObservableCallback } from "observable-hooks";
import type { ForwardedRef } from "react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { EMPTY, defer, finalize, map, mergeWith, pipe, tap } from "rxjs";
import { Vector3 } from "three";
import { blockBrake } from "~/observables/blockBrake";
import { useStore } from "~/store";
import type { Ball, OperatorBuilder, Status } from "~/types";
import { Begin } from "./Begin";
import { Plumbob } from "./Plumbob";

type Props = {
  displayText?: string;
  hidePlumbob?: boolean;
};

export const Factory = forwardRef(function Factory(
  { displayText, hidePlumbob }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const addBall = useStore((state) => state.addBall);
  const removeBall = useStore((state) => state.removeBall);
  const [status, setStatus] = useState<Status>("waiting");
  const [onEnter, enter$] = useObservableCallback<Ball>();
  const [onExit, exit$] = useObservableCallback<Ball>();

  /* Handlers */

  const root = useRef<THREE.Group>(null!);

  const newBall = useCallback(
    (label: string, color: Color) => {
      // Initial ball position
      const position = root.current
        .localToWorld(new Vector3(1, 1.5, 0)) // start from inside the wall to give the ball a push
        .toArray();

      // Create the ball
      const id = addBall({ label, position, color });

      return id;
    },
    [addBall]
  );

  /* Builder */

  useImperativeHandle(
    ref,
    () => ({
      operator() {
        return pipe();
      },
      build() {
        // Keep registry of balls that are on the track
        // So we can remove them when observable completes early
        const ballRegistry: number[] = [];

        return pipe(
          mergeWith(
            defer(() => {
              setStatus("active");
              return EMPTY;
            })
          ),
          map((boxedValue) => ({
            ...boxedValue,
            ballId: newBall(boxedValue.label, boxedValue.color),
          })),
          tap(({ ballId }) => ballRegistry.push(ballId!)), // register ball
          blockBrake(enter$, exit$),
          tap(({ ballId }) =>
            ballRegistry.splice(ballRegistry.indexOf(ballId!), 1)
          ), // unregister balls that have left the track
          finalize(() => ballRegistry.forEach(removeBall)), // clean up balls on completion
          finalize(() => setStatus("complete"))
        );
      },
    }),
    [newBall, removeBall, enter$, exit$]
  );

  return (
    <group ref={root}>
      <Begin displayText={displayText} onEnter={onEnter} onExit={onExit} />
      <Plumbob position={[1, 2.7, 0]} status={status} visible={!hidePlumbob} />
    </group>
  );
});
