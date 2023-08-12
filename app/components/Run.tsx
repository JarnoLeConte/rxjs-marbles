import { useEffect, useMemo } from "react";
import { frame$ } from "~/observables/frame$";
import { useGameStore } from "~/store";
import type { Track } from "./track/parts";
import { build } from "./track/track-builder";

export function Run({ track }: { track: Track }) {
  const lastActivity = useGameStore((state) => state.lastActivity);
  const nextFrame = useGameStore((state) => state.nextFrame);

  // Build track
  const { observable, content } = useMemo(() => build(track), [track]);

  // Run observable
  useEffect(() => {
    const subscription = observable.subscribe(console.debug);
    return () => subscription.unsubscribe();
  }, [observable]);

  // Run frame timer
  useEffect(() => {
    const timer = setInterval(() => {
      console.debug("next frame");
      frame$.next();
      nextFrame();
    }, 1500);
    return () => clearInterval(timer);
  }, [lastActivity, nextFrame]);

  return content;
}
