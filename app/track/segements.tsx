import type { Observable } from "rxjs";
import type { Value } from "~/types";

export enum TrackSegment {
  /* Base segments */
  Straight = "Straight",
  Tunnel = "Tunnel",
  LeftShift = "LeftShift",
  RightShift = "RightShift",
  Ramp = "Ramp",
  DownHill = "DownHill",
  Begin = "Begin",
  Bucket = "Bucket",
  /* Interactive */
  Producer = "Producer",
  Subscriber = "Subscriber",
  Map = "Map",
  SwitchAll = "SwitchAll",
  ConcatAll = "ConcatAll",
  MergeAll = "MergeAll",
}

export type Segment =
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
      segment: TrackSegment.Ramp;
      next: Track;
    }
  | {
      segment: TrackSegment.DownHill;
      next: Track;
    }
  | {
      segment: TrackSegment.Begin;
      next: Track;
    }
  | {
      segment: TrackSegment.Bucket;
    }
  | {
      segment: TrackSegment.Producer;
      props: {
        source$: Observable<Value>;
      };
      next: Track;
    }
  | {
      segment: TrackSegment.Subscriber;
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
    };

export type Track = Segment | null;
