import type { Observable, OperatorFunction } from "rxjs";
import { concatMap, delayWhen, filter, of, pipe, tap } from "rxjs";
import { store } from "~/store";
import type { Ball, Boxed, Value } from "~/types";

export function blockBrake(
  enter$: Observable<Ball>,
  exit$: Observable<Ball>
): OperatorFunction<Boxed<Value>, Boxed<Value>> {
  const { updateBall } = store.getState();

  return pipe(
    delayWhen(({ ballId }) => enter$.pipe(filter(({ id }) => id === ballId))),
    tap(({ ballId }) => {
      updateBall(ballId!, (ball) => ({ ...ball, ghost: true }));
    }),
    concatMap((boxedValue) => {
      return of(boxedValue).pipe(
        tap(({ ballId }) => {
          updateBall(ballId!, (ball) => ({ ...ball, ghost: false }));
        }),
        delayWhen(({ ballId }) => exit$.pipe(filter(({ id }) => id === ballId)))
      );
    })
  );
}
