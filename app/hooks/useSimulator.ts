import { useEffect } from "react";
import { frame$ } from "~/observables/frame$";
import { useGameStore } from "~/store";

export function useSimulator() {
  const lastActivity = useGameStore((state) => state.lastActivity);

  const nextFrame = () => {
    console.log("next frame");
    frame$.next();
  };

  useEffect(() => {
    const timer = setInterval(nextFrame, 1500);
    return () => clearInterval(timer);
  }, [lastActivity]);
}
