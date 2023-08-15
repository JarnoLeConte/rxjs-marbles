import { useEffect } from "react";
import { concatWith } from "rxjs";
import { useTrack } from "~/hooks/useTrack";
import { frame$ } from "~/observables/frame$";
import { wait } from "~/observables/wait";
import { useStore } from "~/store";
import { Build } from "./Build";
import type { Track } from "./track/parts";

export function Run({ track }: { track: Track }) {
  const reset = useStore((state) => state.reset);
  const lastActivity = useStore((state) => state.lastActivity);
  const nextFrame = useStore((state) => state.nextFrame);

  // Build track
  // const { observable, content } = useMemo(() => build(track), [track]);

  // Reset previous runners
  useEffect(() => {
    reset();
  }, [reset]);

  // Run observable
  // useEffect(() => {
  //   const subscription = wait(0) // wait scene to setup
  //     .pipe(concatWith(observable))
  //     .subscribe(console.debug);
  //   return () => subscription.unsubscribe();
  // }, [observable]);

  // Run frame timer
  useEffect(() => {
    const timer = setInterval(() => {
      console.debug("next frame");
      frame$.next();
      nextFrame();
    }, 1500);
    return () => clearInterval(timer);
  }, [lastActivity, nextFrame]);

  const [observable, ref] = useTrack();

  useEffect(() => {
    const subscription = wait(0) // wait scene to setup
      .pipe(concatWith(observable))
      .subscribe(console.debug);
    return () => subscription.unsubscribe();
  }, [observable]);

  return <Build ref={ref} track={track} />;
}
