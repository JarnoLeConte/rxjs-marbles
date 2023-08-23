import type { Observable } from "rxjs";
import type { Boxed, Value } from "~/types";

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
  Partition = "Partition",
}

export type TrackHead =
  | {
      part: Part.Producer;
      props?: {
        source$?: Observable<Boxed<Value>>;
        displayText?: string;
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
        project: (value: Value, index: number) => Boxed<Value>;
        displayText: string;
      };
      tail: TrackTail;
    }
  | {
      part: Part.SwitchAll;
      props?: {
        displayText?: string;
      };
      tail: TrackTail;
    }
  | {
      part: Part.ConcatAll;
      props?: {
        displayText?: string;
      };
      tail: TrackTail;
    }
  | {
      part: Part.MergeAll;
      props?: {
        displayText?: string;
        concurrent?: number;
      };
      tail: TrackTail;
    }
  | {
      part: Part.Partition;
      props?: {
        predicate?: (value: Value, index: number) => boolean;
        displayText?: string;
        trueLabel?: string;
        falseLabel?: string;
      };
      trueTail: TrackTail;
      falseTail: TrackTail;
    };

export type TrackPart<P = Part> = {
  part: P;
} & (TrackHead | TrackTail);

export type Track = TrackHead;
