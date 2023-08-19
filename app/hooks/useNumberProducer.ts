import { useMemo } from "react";
import { map, take } from "rxjs";
import { frameTimer } from "~/observables/frameTimer";
import { box } from "~/utils";

export function useNumberProducer(start = 0, amount = Infinity) {
  return useMemo(() => {
    return frameTimer(0, 1).pipe(
      map((val) => box(val + start)),
      take(amount)
    );
  }, [start, amount]);
}
