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
  Concat = "Concat",
}

export type TrackPart =
  | {
      part: Part.Begin;
      tail: Track;
    }
  | {
      part: Part.Bucket;
    }
  | {
      part: Part.Straight;
      tail: Track;
    }
  | {
      part: Part.Tunnel;
      tail: Track;
    }
  | {
      part: Part.LeftShift;
      tail: Track;
    }
  | {
      part: Part.RightShift;
      tail: Track;
    }
  | {
      part: Part.RightJoin;
      incoming: [Track, Track];
      tail: Track;
    }
  | {
      part: Part.Ramp;
      tail: Track;
    }
  | {
      part: Part.DownHill;
      tail: Track;
    }
  | {
      part: Part.Producer;
      props: {
        source$: Observable<Value>;
        displayText?: string;
      };
      tail: Track;
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
      tail: Track;
    }
  | {
      part: Part.SwitchAll;
      tail: Track;
    }
  | {
      part: Part.ConcatAll;
      tail: Track;
    }
  | {
      part: Part.MergeAll;
      tail: Track;
    }
  | {
      part: Part.Merge;
      props?: {
        displayText?: string;
      };
      incoming: [Track, Track];
      tail: Track;
    }
  | {
      part: Part.Concat;
      props?: {
        displayText?: string;
      };
      incoming: [Track, Track];
      tail: Track;
    };

// type TrackHead =

// type TrackTail =

export type Track = TrackPart | null;
