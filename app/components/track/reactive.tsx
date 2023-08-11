import type { Observable, OperatorFunction } from "rxjs";
import {
  EMPTY,
  concat,
  concatMap,
  map,
  merge,
  mergeMap,
  of,
  pipe,
  switchMap,
  tap,
  throwError,
} from "rxjs";
import { notification$ } from "~/observables/notification$";
import type { TaggedObservable, Value } from "~/types";
import { isTaggedObservable } from "~/utils";
import type { Track } from "./parts";
import { Part } from "./parts";

export function reactive(track: Track): Observable<Value> {
  if (!track) return EMPTY;

  switch (track.part) {
    case Part.Producer: {
      const { name: producer, source$ } = track.props;
      return source$.pipe(
        tap((value) => notification$.next({ type: "emit", producer, value })),
        buildPipe(track.next)
      );
    }
    case Part.Merge: {
      const [trackA, trackB] = track.incoming;
      const A$ = reactive(trackA);
      const B$ = reactive(trackB);
      return merge(A$, B$).pipe(buildPipe(track.next));
    }
    case Part.Concat: {
      const [trackA, trackB] = track.incoming;
      const A$ = reactive(trackA);
      const B$ = reactive(trackB);
      return concat(A$, B$).pipe(buildPipe(track.next));
    }
    default:
      throw new Error(
        `Unknown how to construct observable from track part ${track.part}`
      );
  }
}

function buildPipe(track: Track): OperatorFunction<Value, Value> {
  if (!track) return pipe();

  switch (track.part) {
    case Part.Bucket:
    case Part.Subscriber:
      return pipe();
    case Part.Begin:
    case Part.Straight:
    case Part.Tunnel:
    case Part.LeftShift:
    case Part.RightShift:
    case Part.RightJoin:
    case Part.Ramp:
    case Part.DownHill:
      return buildPipe(track.next);
    case Part.Map:
      return map(track.props.project);
    case Part.SwitchAll:
      return pipe(
        assertObservable(),
        switchMap(({ observable$ }) => {
          return observable$; // TODO - add notification
        })
      );
    case Part.ConcatAll:
      return pipe(
        assertObservable(),
        concatMap(({ observable$ }, index) => {
          const producer = `${track.props.name}#${index}`;
          return observable$.pipe(
            tap((value) =>
              notification$.next({ type: "emit", producer, value })
            )
          );
        })
      );
    case Part.MergeAll:
      return pipe(
        assertObservable(),
        mergeMap(({ observable$ }) => {
          return observable$; // TODO - add notification
        })
      );
    default:
      throw new Error(
        `Unknown how to construct pipe operator from track part ${track.part}`
      );
  }
}

function assertObservable(): OperatorFunction<Value, TaggedObservable> {
  return mergeMap<Value, Observable<TaggedObservable>>((value) =>
    isTaggedObservable(value)
      ? of(value)
      : throwError(
          () => new Error(`Expected an observable value, but got: ${value}`)
        )
  );
}
