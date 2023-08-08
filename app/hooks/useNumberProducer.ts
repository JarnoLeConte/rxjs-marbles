import { useMemo } from "react";
import { map, take } from "rxjs";
import { frameTimer } from "~/rxjs/frameTimer";

export function useNumberProducer(start = 0, amount = Infinity) {
  return useMemo(() => {
    return frameTimer(0, 1).pipe(
      map((val) => val + start),
      take(amount)
    );
  }, []);
}
