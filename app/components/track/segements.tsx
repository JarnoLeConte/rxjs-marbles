export enum TrackSegment {
  Straight = "Straight",
  LeftShift = "LeftShift",
  RightShift = "RightShift",
}

export type Track =
  | null
  | {
      segment: TrackSegment.Straight;
      next: Track;
    }
  | {
      segment: TrackSegment.LeftShift;
      next: Track;
    }
  | {
      segment: TrackSegment.RightShift;
      next: Track;
    };
