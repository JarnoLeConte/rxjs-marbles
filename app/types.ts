import type { Color } from "@react-three/fiber";
import type { Observable } from "rxjs";

export type TaggedObservable = {
  label: string;
  observable$: Observable<Value>;
};

export type Value = number | string | boolean | TaggedObservable;

export type Ball = {
  id: number;
  value: Value;
  defaultPosition: [number, number, number];
  color: Color;
};
