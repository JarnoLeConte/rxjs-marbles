import { useMemo } from "react";
import { map, of, take, zip } from "rxjs";
import { boxed } from "~/observables/boxed";
import { frameTimer } from "~/observables/frameTimer";
import { box, numberToChar } from "~/utils";

export function useObservableProducer(startChar = "A") {
  return useMemo(() => {
    const A$ = box(
      frameTimer(0, 1).pipe(take(3), boxed()),
      numberToChar(0, startChar)
    );
    const B$ = box(
      frameTimer(0, 1).pipe(take(3), boxed()),
      numberToChar(1, startChar)
    );
    const C$ = box(
      frameTimer(0, 1).pipe(take(3), boxed()),
      numberToChar(2, startChar)
    );
    return zip(frameTimer(0, 1), of(A$, B$, C$)).pipe(map(([, x]) => x));
  }, [startChar]);
}
