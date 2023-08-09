import type { Observable } from "rxjs";
import type { Value } from "~/types";

export enum TrackSegment {
  /* Base segments */
  Begin = "Begin",
  Bucket = "Bucket",
  Straight = "Straight",
  Tunnel = "Tunnel",
  LeftShift = "LeftShift",
  RightShift = "RightShift",
  RightJoin = "RightJoin",
  Ramp = "Ramp",
  DownHill = "DownHill",

  /* Interactive */
  Producer = "Producer",
  Subscriber = "Subscriber",
  Map = "Map",
  SwitchAll = "SwitchAll",
  ConcatAll = "ConcatAll",
  MergeAll = "MergeAll",
  Merge = "Merge",
}

export type Segment =
  | {
      segment: TrackSegment.Begin;
      next: Track;
    }
  | {
      segment: TrackSegment.Bucket;
    }
  | {
      segment: TrackSegment.Straight;
      next: Track;
    }
  | {
      segment: TrackSegment.Tunnel;
      next: Track;
    }
  | {
      segment: TrackSegment.LeftShift;
      next: Track;
    }
  | {
      segment: TrackSegment.RightShift;
      next: Track;
    }
  | {
      segment: TrackSegment.RightJoin;
      incoming: [Track, Track];
      next: Track;
    }
  | {
      segment: TrackSegment.Ramp;
      next: Track;
    }
  | {
      segment: TrackSegment.DownHill;
      next: Track;
    }
  | {
      segment: TrackSegment.Producer;
      props: {
        source$: Observable<Value>;
        displayText?: string;
      };
      next: Track;
    }
  | {
      segment: TrackSegment.Subscriber;
      props?: {
        displayText?: string;
      };
    }
  | {
      segment: TrackSegment.Map;
      props: {
        project: (value: Value) => Value;
        displayText: string;
      };
      next: Track;
    }
  | {
      segment: TrackSegment.SwitchAll;
      next: Track;
    }
  | {
      segment: TrackSegment.ConcatAll;
      next: Track;
    }
  | {
      segment: TrackSegment.MergeAll;
      next: Track;
    }
  | {
      segment: TrackSegment.Merge;
      props?: {
        displayText?: string;
      };
      incoming: [Track, Track];
      next: Track;
    };

export type Track = Segment | null;
