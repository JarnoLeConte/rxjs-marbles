import type { Track } from "~/types";
import { render } from "../track/render";
import { TrackSegment } from "../track/segements";
import { Center } from "@react-three/drei";

export function TestScene() {
  const track: Track = {
    segment: TrackSegment.Straight,
    next: {
      segment: TrackSegment.RightShift,
      next: {
        segment: TrackSegment.Straight,
        next: {
          segment: TrackSegment.LeftShift,
          next: {
            segment: TrackSegment.RightShift,
            next: null,
          },
        },
      },
    },
  };
  return <Center>{render(track)}</Center>;
}
