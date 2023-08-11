import { Center } from "@react-three/drei";
import type { Observable, OperatorFunction } from "rxjs";
import {
  EMPTY,
  concat,
  concatAll,
  map,
  merge,
  mergeAll,
  pipe,
  switchAll,
  throwError,
} from "rxjs";
import type { Value } from "~/types";
import { isTaggedObservable } from "~/utils";
import type { Track, TrackTail } from "./parts";
import { Part } from "./parts";
import { DownHill } from "./parts/DownHill";
import { Ramp } from "./parts/Ramp";
import { Straight } from "./parts/Straight";
import { Concat } from "./reactive-parts/Concat";
import { ConcatAll } from "./reactive-parts/ConcatAll";
import { Map } from "./reactive-parts/Map";
import { Merge } from "./reactive-parts/Merge";
import { MergeAll } from "./reactive-parts/MergeAll";
import { Producer } from "./reactive-parts/Producer";
import { Subscriber } from "./reactive-parts/Subscriber";
import { SwitchAll } from "./reactive-parts/SwitchAll";

type Result = {
  observable: Observable<Value>;
  content: React.ReactNode;
};

type TailResult = {
  operator: OperatorFunction<Value, Value>;
  children: React.ReactNode;
};

export function build(track: Track): Result {
  if (!track) return { observable: EMPTY, content: null };

  switch (track.part) {
    case Part.Producer: {
      const { source$ } = track.props;
      const { operator, children } = buildTail(track.tail);
      return {
        observable: source$.pipe(operator),
        content: (
          <group>
            <Producer {...track.props} />
            <group position={[2, 0, 0]}>{children}</group>
          </group>
        ),
      };
    }
    case Part.Merge: {
      const [trackA, trackB] = track.incoming;
      const { observable: A$, content: contentA } = build(trackA);
      const { observable: B$, content: contentB } = build(trackB);
      const { operator, children } = buildTail(track.tail);
      return {
        observable: merge(A$, B$).pipe(operator),
        content: (
          <group position={[0, 0, 0]}>
            <Merge {...track.props} />
            <Center left top>
              {contentA}
            </Center>
            <Center left top position={[0, 0, -2]}>
              {contentB}
            </Center>
            <group position={[6, 0, 0]}>{children}</group>
          </group>
        ),
      };
    }
    case Part.Concat: {
      const [trackA, trackB] = track.incoming;
      const { observable: A$, content: contentA } = build(trackA);
      const { observable: B$, content: contentB } = build(trackB);
      const { operator, children } = buildTail(track.tail);
      return {
        observable: concat(A$, B$).pipe(operator),
        content: (
          <group position={[0, 0, 0]}>
            <Concat {...track.props} />
            <Center left top>
              {contentA}
            </Center>
            <Center left top position={[0, 0, -2]}>
              {contentB}
            </Center>
            <group position={[6, 0, 0]}>{children}</group>
          </group>
        ),
      };
    }
    default:
      throw new Error(
        `Unknown how to construct observable from track part ${track}`
      );
  }
}

function buildTail(track: TrackTail): TailResult {
  if (!track) return { operator: pipe(), children: null };

  switch (track.part) {
    case Part.Subscriber:
      return {
        operator: pipe(),
        children: <Subscriber {...track.props} />,
      };
    case Part.Straight: {
      const { operator, children } = buildTail(track.tail);
      return {
        operator,
        children: (
          <group>
            <Straight />
            <group position={[2, 0, 0]}>{children}</group>
          </group>
        ),
      };
    }
    case Part.Ramp: {
      const { operator, children } = buildTail(track.tail);
      return {
        operator,
        children: (
          <group>
            <Ramp />
            <group position={[2, -1, 0]}>{children}</group>
          </group>
        ),
      };
    }
    case Part.DownHill: {
      const { operator, children } = buildTail(track.tail);
      return {
        operator,
        children: (
          <group>
            <DownHill />
            <group position={[4, -1, 0]}>{children}</group>
          </group>
        ),
      };
    }
    case Part.Map: {
      const { project } = track.props;
      const { operator, children } = buildTail(track.tail);
      return {
        operator: pipe(map(project), operator),
        children: (
          <group>
            <Map {...track.props} />
            <group position={[2, 0, 0]}>{children}</group>
          </group>
        ),
      };
    }
    case Part.SwitchAll: {
      const { operator, children } = buildTail(track.tail);
      return {
        operator: pipe(assertObservable(), switchAll(), operator),
        children: (
          <group>
            <SwitchAll />
            <group position={[2, 0, 0]}>{children}</group>
          </group>
        ),
      };
    }
    case Part.ConcatAll: {
      const { operator, children } = buildTail(track.tail);
      return {
        operator: pipe(assertObservable(), concatAll(), operator),
        children: (
          <group>
            <ConcatAll />
            <group position={[2, 0, 0]}>{children}</group>
          </group>
        ),
      };
    }
    case Part.MergeAll: {
      const { operator, children } = buildTail(track.tail);
      return {
        operator: pipe(assertObservable(), mergeAll(), operator),
        children: (
          <group>
            <MergeAll />
            <group position={[2, 0, 0]}>{children}</group>
          </group>
        ),
      };
    }
    default:
      throw new Error(
        `Unknown how to construct pipe operator from track ${track}`
      );
  }
}

function assertObservable(): OperatorFunction<Value, Observable<Value>> {
  return map<Value, Observable<Value>>((value) =>
    isTaggedObservable(value)
      ? value.observable$
      : throwError(
          () => new Error(`Expected an observable value, but got: ${value}`)
        )
  );
}
