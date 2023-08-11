import { useEffect, useMemo } from "react";
import type { Track } from "./track/parts";
import { build } from "./track/track-builder";
import { useGameStore } from "~/store";
import { frame$ } from "~/observables/frame$";

export function Run({ track }: { track: Track }) {
  const lastActivity = useGameStore((state) => state.lastActivity);

  // Build track
  const { observable, content } = useMemo(() => build(track), [track]);

  // Run observable
  useEffect(() => {
    const subscription = observable.subscribe();
    return () => subscription.unsubscribe();
  }, [observable]);

  // Run frame timer
  useEffect(() => {
    const nextFrame = () => {
      console.debug("next frame");
      frame$.next();
    };
    const timer = setInterval(nextFrame, 1500);
    return () => clearInterval(timer);
  }, [lastActivity]);

  return content;
}
