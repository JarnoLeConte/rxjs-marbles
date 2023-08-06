import { useEffect } from "react";
import { frame$ } from "~/rxjs/frame$";
import { useGameStore } from "~/store";

export function useSimulator() {
  const balls = useGameStore((state) => state.balls);

  // Go to next tick when current tick finished processing
  // and all balls are in an end state or being paused
  useEffect(() => {
    if (balls.length === 0) {
      const timer = setInterval(() => {
        console.log("next frame");
        frame$.next();
      }, 500);
      return () => clearInterval(timer);
    }
  }, [balls.length]);
}
