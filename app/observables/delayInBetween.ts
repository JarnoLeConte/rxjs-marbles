import type { MonoTypeOperatorFunction } from "rxjs";
import { concatMap, concatWith, of } from "rxjs";
import { wait } from "./wait";

export function delayInBetween<T>(
  duration: number
): MonoTypeOperatorFunction<T> {
  return concatMap((val) => of(val).pipe(concatWith(wait(duration))));
}
