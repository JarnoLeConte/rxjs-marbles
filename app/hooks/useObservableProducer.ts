import { useMemo } from "react";
import { map, of, take, zip } from "rxjs";
import { frameTimer } from "~/observables/frameTimer";
import { numberToChar, tag } from "~/utils";

export function useObservableProducer(startChar = "A") {
  return useMemo(() => {
    const A$ = tag(numberToChar(0, startChar), frameTimer(0, 1).pipe(take(3)));
    const B$ = tag(numberToChar(1, startChar), frameTimer(0, 1).pipe(take(3)));
    const C$ = tag(numberToChar(2, startChar), frameTimer(0, 1).pipe(take(3)));
    return zip(frameTimer(0, 1), of(A$, B$, C$)).pipe(map(([, x]) => x));
  }, []);
}
