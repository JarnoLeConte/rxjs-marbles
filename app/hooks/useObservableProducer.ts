import { useMemo } from "react";
import { map, of, take, zip } from "rxjs";
import { frameTimer } from "~/rxjs/frameTimer";
import { tag } from "~/utils";

export function useObservableProducer() {
  return useMemo(() => {
    const A$ = tag("A", frameTimer(0, 1).pipe(take(3)));
    const B$ = tag("B", frameTimer(0, 1).pipe(take(3)));
    const C$ = tag("C", frameTimer(0, 1).pipe(take(3)));
    return zip(frameTimer(0, 1), of(A$, B$, C$)).pipe(map(([, x]) => x));
  }, []);
}
