import {
  isObservable,
  mergeMap,
  of,
  throwError,
  type Observable,
  type OperatorFunction,
} from "rxjs";
import type { Boxed, Value } from "./types";

export enum CollisionGroup {
  Track = 0,
  Ball = 1,
  Detector = 2,
}

export function randomColor() {
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function numberToChar(index: number, startChar = "A") {
  const startCharCode = startChar.charCodeAt(0);
  return String.fromCharCode(startCharCode + index);
}

export function box(value: Value, label?: string): Boxed<Value> {
  return { value, label: label ?? renderValue(value) };
}

export function renderBoxedValue(boxedValue: Boxed<Value>): string {
  return boxedValue.label ?? renderValue(boxedValue.value);
}

export function renderValue(value?: Value): string {
  if (value === undefined || value === null) return "-";
  switch (typeof value) {
    case "number":
      return `${value}`;
    case "string":
      return `"${value}"`;
    case "boolean":
      return value ? "true" : "false";
    case "object":
      if (Array.isArray(value)) {
        return `[${value.map(renderBoxedValue).join(", ")}]`;
      }
    default:
      throw new Error(`Unknown value type ${value}`);
  }
}

export function isBoxedObservable(
  boxedValue: Boxed<Value>
): boxedValue is Boxed<Observable<Boxed<Value>>> {
  return isObservable(boxedValue.value);
}

export function assertBoxedObservable(): OperatorFunction<
  Boxed<Value>,
  Boxed<Observable<Boxed<Value>>>
> {
  return mergeMap((boxedValue) =>
    isBoxedObservable(boxedValue)
      ? of(boxedValue)
      : throwError(
          () =>
            new Error(`Expected an observable value, but got: ${boxedValue}`)
        )
  );
}
