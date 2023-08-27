import { Center } from "@react-three/drei";
import { useEffect } from "react";
import { useStore } from "~/store";
import type { TrackRecord } from "~/types";
import { Build } from "./Build";
import { objectId } from "~/utils";
import { TrackThemeProvider } from "./TrackThemeProvider";

export function Runner({ trackRecord }: { trackRecord: TrackRecord }) {
  const reset = useStore((state) => state.reset);
  const trackMap = useStore((state) => state.trackMap);
  const addTrack = useStore((state) => state.addTrack);

  // Reset running activity when changing to a new scene
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset, trackRecord]);

  // Add provided tracks
  useEffect(() => {
    Object.entries(trackRecord).forEach(([label, track]) =>
      addTrack(label, track)
    );
  }, [addTrack, trackRecord]);

  // Find main track
  const mainTrackEntry = trackMap.get("main");

  // Run marble track
  useEffect(() => {
    if (!mainTrackEntry?.ref?.current) return;
    const observable$ = mainTrackEntry.ref.current.build();
    const subscription = observable$.subscribe();
    return () => subscription.unsubscribe();
  }, [mainTrackEntry]);

  // Run observable
  // useEffect(() => {
  //   if (!mainTrackEntry?.ref?.current) return;
  //   const observable$ = mainTrackEntry.ref.current.observable();
  //   const subscription = observable$.subscribe((boxedValue) => {
  //     // console.debug(unboxDeep(boxedValue))
  //   });
  //   return () => subscription.unsubscribe();
  // }, [mainTrackEntry]);

  /* Render */

  if (!mainTrackEntry) {
    console.warn("No track found named 'main'");
    return <></>;
  }

  // Render all tracks from the store
  return (
    <Center key={objectId(mainTrackEntry)}>
      <TrackThemeProvider value={{ color: mainTrackEntry.track.color }}>
        <Build ref={mainTrackEntry.ref} track={mainTrackEntry.track} />
      </TrackThemeProvider>
      <group position={[0, 2, -4]}>
        {Array.from(trackMap)
          .filter(([key]) => key !== "main")
          .map(([key, { ref, track }], index) => (
            <group key={key} position={[5 * index, 0, 0]}>
              <TrackThemeProvider value={{ color: track.color }}>
                <Build ref={ref} track={track} />
              </TrackThemeProvider>
            </group>
          ))}
      </group>
    </Center>
  );
}
