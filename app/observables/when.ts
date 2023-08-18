import type { Observable } from "rxjs";
import { concatWith, defer, ignoreElements, take } from "rxjs";

export function when<T>(
  signal: Observable<any>,
  deffered: () => Observable<T>
) {
  return signal.pipe(take(1), ignoreElements(), concatWith(defer(deffered)));
}
