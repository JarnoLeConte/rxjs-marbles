import { useMemo } from "react";
import type { BallContent, Producer, Tick } from "~/types";

// Generate a number on each tick,
// - starting from `start` value,
// - and a total of `count` numbers
export function useNumberProducer({
  start,
  count,
}: {
  start: number;
  count: number;
}): Producer {
  return useMemo(
    () =>
      new Map<Tick, BallContent[]>(
        [...Array(count).keys()].map((i) => [
          i,
          [
            {
              type: "number",
              value: start + i,
            },
          ],
        ])
      ),
    []
  );
}
