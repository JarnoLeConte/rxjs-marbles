import type { Observable } from "rxjs";
import type { Value } from "~/types";

export enum Part {
  Straight = "Straight",
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
  CombineLatest = "CombineLatest",
}

export type TrackHead =
  | {
      part: Part.Producer;
      props: {
        source$: Observable<Value>;
        displayText?: string;
        waitForFrame?: boolean;
      };
      tail: TrackTail;
    }
  | {
      part: Part.Merge;
      props?: {
        displayText?: string;
      };
      incoming: [Track, Track];
      tail: TrackTail;
    }
  | {
      part: Part.Concat;
      props?: {
        displayText?: string;
      };
      incoming: [Track, Track];
      tail: TrackTail;
    }
  | {
      part: Part.CombineLatest;
      props?: {
        displayText?: string;
      };
      incoming: [Track, Track];
      tail: TrackTail;
    };

export type TrackTail =
  | null
  | {
      part: Part.Straight;
      tail: TrackTail;
    }
  | {
      part: Part.Ramp;
      tail: TrackTail;
    }
  | {
      part: Part.DownHill;
      tail: TrackTail;
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
      tail: TrackTail;
    }
  | {
      part: Part.SwitchAll;
      tail: TrackTail;
    }
  | {
      part: Part.ConcatAll;
      tail: TrackTail;
    }
  | {
      part: Part.MergeAll;
      tail: TrackTail;
    };

export type TrackPart = TrackHead | TrackTail;

export type Track = TrackHead;
