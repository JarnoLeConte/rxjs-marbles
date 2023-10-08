import type { Color } from "@react-three/fiber";
import type { Observable, OperatorFunction } from "rxjs";
import type { Track } from "./types";

export type Boxed<V> = {
  value: V;
  label: string;
  ballId?: number;
  color: Color;
};

export type Ball = {
  id: number;
  label: string;
  defaultPosition: [number, number, number];
  color: Color;
  ghost?: boolean; // Not taking part in physics simulation
};

export type { Track } from "~/components/track/parts";

export type TrackRecord = Record<string, Track>;

export type OperatorBuilder = {
  operator: () => OperatorFunction<Boxed<unknown>, Boxed<unknown>>;
  build: () => OperatorFunction<Boxed<unknown>, Boxed<unknown>>;
};
export type ObservableBuilder = {
  observable: () => Observable<Boxed<unknown>>;
  build: () => Observable<Boxed<unknown>>;
};

export type Status = "waiting" | "active" | "complete" | "error";
