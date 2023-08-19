import type { Observable } from "rxjs";
import { mergeMap, take } from "rxjs";

export function when<T, S>(
  signal: Observable<S>,
  deffered: (value: S) => Observable<T>
) {
  return signal.pipe(
    take(1),
    mergeMap((value) => {
      return deffered(value);
    })
  );
}
