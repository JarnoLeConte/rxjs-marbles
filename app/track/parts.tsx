import type { Observable } from "rxjs";
import type { Value } from "~/types";

export enum Part {
  Begin = "Begin",
  Bucket = "Bucket",
  Straight = "Straight",
  Tunnel = "Tunnel",
  LeftShift = "LeftShift",
  RightShift = "RightShift",
  RightJoin = "RightJoin",
  Ramp = "Ramp",
  DownHill = "DownHill",

  /* Reactive parts */
  Producer = "Producer",
  Subscriber = "Subscriber",
  Map = "Map",
  SwitchAll = "SwitchAll",
  ConcatAll = "ConcatAll",
  MergeAll = "MergeAll",
  Merge = "Merge",
}

export type TrackPart =
  | {
      part: Part.Begin;
      next: Track;
    }
  | {
      part: Part.Bucket;
    }
  | {
      part: Part.Straight;
      next: Track;
    }
  | {
      part: Part.Tunnel;
      next: Track;
    }
  | {
      part: Part.LeftShift;
      next: Track;
    }
  | {
      part: Part.RightShift;
      next: Track;
    }
  | {
      part: Part.RightJoin;
      incoming: [Track, Track];
      next: Track;
    }
  | {
      part: Part.Ramp;
      next: Track;
    }
  | {
      part: Part.DownHill;
      next: Track;
    }
  | {
      part: Part.Producer;
      props: {
        source$: Observable<Value>;
        displayText?: string;
      };
      next: Track;
    }
  | {
      part: Part.Subscriber;
      props?: {
        displayText?: string;
      };
    }
  | {
      part: Part.Map;
      props: {
        project: (value: Value) => Value;
        displayText: string;
      };
      next: Track;
    }
  | {
      part: Part.SwitchAll;
      next: Track;
    }
  | {
      part: Part.ConcatAll;
      next: Track;
    }
  | {
      part: Part.MergeAll;
      next: Track;
    }
  | {
      part: Part.Merge;
      props?: {
        displayText?: string;
      };
      incoming: [Track, Track];
      next: Track;
    };

export type Track = TrackPart | null;
