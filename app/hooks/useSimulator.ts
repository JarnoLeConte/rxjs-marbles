import { useEffect } from "react";
import { useGameStore } from "~/store";

export function useSimulator() {
  const balls = useGameStore((state) => state.balls);
  const tick = useGameStore((state) => state.tick);
  const nextTick = useGameStore((state) => state.nextTick);

  // Go to next tick when current tick finished processing
  // and all balls are in an end state or being paused
  useEffect(() => {
    if (balls.length === 0) {
      const timer = setTimeout(() => {
        nextTick();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [balls.length, nextTick, tick]);
}
