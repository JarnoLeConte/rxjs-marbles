import { useEffect } from "react";
import { useGameStore } from "~/store";

export function useSimulator() {
  const balls = useGameStore((state) => state.balls);
  const addBall = useGameStore((state) => state.addBall);
  const tick = useGameStore((state) => state.tick);
  const nextTick = useGameStore((state) => state.nextTick);

  // Create an an ball every tick
  useEffect(() => {
    if (tick === 0) return;
    addBall({ value: tick, position: [-6.05, 1, 0] });
  }, [addBall, tick]);

  // Go to next tick when current tick finished processing
  // and all balls are in an end state or being paused
  useEffect(() => {
    if (balls.length === 0) {
      nextTick();
    }
  }, [balls.length, nextTick]);
}
