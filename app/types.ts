import type { Color } from "@react-three/fiber";
import type { Observable, OperatorFunction } from "rxjs";

export type TaggedObservable = {
  label: string;
  observable$: Observable<Value>;
};

export type Value = number | string | boolean | Value[] | TaggedObservable;

export type Ball = {
  id: number;
  value: Value;
  defaultPosition: [number, number, number];
  color: Color;
  ghost?: boolean; // Not taking part in physics simulation
};

export type { Track } from "~/components/track/parts";

export type Builder<
  T extends Observable<Value> | OperatorFunction<Value, Value>
> = React.ForwardedRef<T>;

export type Status = "waiting" | "active" | "complete" | "error";
