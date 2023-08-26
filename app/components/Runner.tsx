import { useEffect } from "react";
import { useStore } from "~/store";
import { unboxDeep } from "~/utils";
import { Build } from "./Build";
import type { TrackRecord } from "~/types";

export function Runner({ trackRecord }: { trackRecord: TrackRecord }) {
  const reset = useStore((state) => state.reset);
  const trackMap = useStore((state) => state.trackMap);
  const addTrack = useStore((state) => state.addTrack);

  // Add tracks
  useEffect(() => {
    Object.entries(trackRecord).forEach(([label, track]) =>
      addTrack(label, track)
    );
  }, [trackRecord, addTrack]);

  // Find main track
  const mainTrackEntry = trackMap.get("main");

  // Reset previous runners
  useEffect(() => {
    reset();
  }, [reset, mainTrackEntry, trackRecord]);

  // Run marble track
  useEffect(() => {
    if (!mainTrackEntry?.ref?.current) return;
    const observable$ = mainTrackEntry.ref.current.build();
    const subscription = observable$.subscribe();
    return () => subscription.unsubscribe();
  }, [mainTrackEntry]);

  // Run observable
  useEffect(() => {
    if (!mainTrackEntry?.ref?.current) return;
    const observable$ = mainTrackEntry.ref.current.observable();
    const subscription = observable$.subscribe((boxedValue) =>
      console.debug(unboxDeep(boxedValue))
    );
    return () => subscription.unsubscribe();
  }, [mainTrackEntry]);

  /* Render */

  if (!mainTrackEntry) {
    console.warn("No track found named 'main'");
    return <></>;
  }

  return Array.from(trackMap).map(([key, { ref, track }], index) => (
    <group key={key} position={[0, 2 * index, -4 * index]}>
      <Build ref={ref} track={track} />
    </group>
  ));
}
