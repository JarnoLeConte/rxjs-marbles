import type { Track } from "~/types";
import { RightShiftTrack } from "./RightShiftTrack";
import { TrackSegment } from "./segements";
import { LeftShiftTrack } from "./LeftShiftTrack";
import { StraightTrack } from "./StraightTrack";

export function render(track: Track) {
  if (!track) return null;
  switch (track.segment) {
    case TrackSegment.Straight:
      return (
        <group>
          <StraightTrack />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.LeftShift:
      return (
        <group>
          <LeftShiftTrack />
          <group position={[4, 0, -2]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.RightShift:
      return (
        <group>
          <RightShiftTrack />
          <group position={[4, 0, 2]}>{render(track.next)}</group>
        </group>
      );
    default:
      throw new Error(`Unknown track segment ${track}`);
  }
}
