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
import { delayInBetween } from "~/observables/delayInBetween";
import { useStore } from "~/store";
import type { OperatorBuilder, Status } from "~/types";
import { Begin } from "./Begin";
import { Plumbob } from "./Plumbob";

type Props = {
  displayText?: string;
};

export const Factory = forwardRef(function Factory(
  { displayText }: Props,
  ref: ForwardedRef<OperatorBuilder>
) {
  const addBall = useStore((state) => state.addBall);
  const updateBall = useStore((state) => state.updateBall);
  const [status, setStatus] = useState<Status>("waiting");

  /* Handlers */

  const root = useRef<THREE.Group>(null!);

  const newBall = useCallback(
    (label: string) => {
      // Initial ball position
      const position = root.current
        .localToWorld(new Vector3(1, 1.5, 0)) // start from inside the wall to give the ball a push
        .toArray();

      // Create the ball
      const id = addBall({ label, position, ghost: true });

      return id;
    },
    [addBall]
  );

  /* Builder */

  useImperativeHandle(
    ref,
    () => ({
      build() {
        return pipe(
          mergeWith(
            defer(() => {
              setStatus("active");
              return EMPTY;
            })
          ),
          finalize(() => setStatus("complete")),
          map((boxedValue) => ({
            ...boxedValue,
            ballId: newBall(boxedValue.label),
          })),
          delayInBetween(1250),
          tap(({ ballId }) =>
            updateBall(ballId, (ball) => ({ ...ball, ghost: false }))
          )
        );
      },
    }),
    [newBall, updateBall]
  );

  return (
    <group ref={root}>
      <Begin displayText={displayText ?? `source$.pipe(`} />
      <Plumbob position={[1, 2.7, 0]} status={status} />
    </group>
  );
});
