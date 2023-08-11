import { useEffect } from "react";
import { delayWhen } from "rxjs";
import { reactive } from "~/components/track/reactive";
import { frame$ } from "~/observables/frame$";
import type { Track } from "~/types";

export function useReactiveTrack(track: Track) {
  useEffect(() => {
    const sub = reactive(track)
      .pipe(delayWhen(() => frame$))
      .subscribe();
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
