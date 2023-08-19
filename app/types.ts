import type { Color } from "@react-three/fiber";
import type { Observable, OperatorFunction } from "rxjs";

export type Value =
  | number
  | string
  | boolean
  | Boxed<Value>[]
  | Observable<Boxed<Value>>;

export type Boxed<V extends Value> = {
  value: V;
  label: string;
  ballId?: number;
};

export type Ball = {
  id: number;
  label: string;
  defaultPosition: [number, number, number];
  color: Color;
  ghost?: boolean; // Not taking part in physics simulation
};

export type { Track } from "~/components/track/parts";

export type OperatorBuilder = {
  build: () => OperatorFunction<Boxed<Value>, Boxed<Value>>;
};
export type ObservableBuilder = {
  build: () => Observable<Boxed<Value>>;
};

export type Status = "waiting" | "active" | "complete" | "error";
