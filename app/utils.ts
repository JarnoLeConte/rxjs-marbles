import type { Observable, OperatorFunction } from "rxjs";
import { isObservable, map, mergeMap, of, pipe, throwError } from "rxjs";
import type { Boxed } from "./types";

export enum CollisionGroup {
  Track = 0,
  Ball = 1,
  Detector = 2,
}

export enum Color {
  Red = "#dc5d78",
  Green = "#2bd065",
  Blue = "#2b7dd0",
  // Cyan = "#4ca9d4",
  // Lime = "#88d02b",
  Yellow = "#e2cc33",
  Orange = "#e1923f",
  Purple = "#d13a9e",
}

export function randomColor() {
  const colors = Object.values(Color);
  return colors[Math.floor(Math.random() * colors.length)];
}

export function indexToColor(index: number) {
  const colors = Object.values(Color);
  return colors[index % colors.length];
}

export function numberToColor(number: number) {
  return indexToColor(number - 1);
}

export function indexToChar(index: number, startChar = "A") {
  const startCharCode = startChar.charCodeAt(0);
  return String.fromCharCode(startCharCode + index);
}

export function numberToChar(number: number, startChar = "A") {
  return indexToChar(number - 1, startChar);
}

export function box<V>(
  props: Required<Pick<Boxed<V>, "value">> & Partial<Boxed<V>>
): Boxed<V> {
  return {
    ...props,
    color: props.color ?? randomColor(),
    label: props.label ?? renderValue(props.value),
  };
}

export function unbox<V>(boxedValue: Boxed<V>): V {
  return boxedValue.value;
}

export function unboxDeep<V>(boxedValue: Boxed<V>): V {
  const value = unbox(boxedValue);
  if (isObservable(value)) {
    return value.pipe(map((v) => (isBoxedValue(v) ? unboxDeep(v) : v))) as V;
  }
  if (Array.isArray(value)) {
    return value.map((v) => (isBoxedValue(v) ? unboxDeep(v) : v)) as V;
  }
  return value;
}

export function renderBoxedValue<V>(boxedValue: Boxed<V>): string {
  return boxedValue.label ?? renderValue(unbox(boxedValue));
}

export function renderValue(value?: any): string {
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
        return `[${value
          .map((v) => (isBoxedValue(v) ? renderBoxedValue(v) : renderValue(v)))
          .join(", ")}]`;
      }
      if (isObservable(value)) {
        return "$";
      }
      return "{...}";
    default:
      throw new Error(`Unknown value type ${value}`);
  }
}

export function isBoxedValue<V>(boxedValue: any): boxedValue is Boxed<V> {
  // TODO: improve quality of this check
  return (
    typeof boxedValue === "object" &&
    boxedValue !== null &&
    "value" in boxedValue &&
    "label" in boxedValue
  );
}

export function isBoxedObservable<T>(
  boxedValue: any
): boxedValue is Boxed<Observable<T>> {
  return isBoxedValue(boxedValue) && isObservable(unbox(boxedValue));
}

export function assert<T>(
  predicate: (value: any) => value is T
): OperatorFunction<any, T> {
  return mergeMap((value) =>
    predicate(value)
      ? of(value)
      : throwError(
          () => new Error(`Value '${value}' does not match assertion.`)
        )
  );
}

export function assertInner<T>(
  predicate: (value: any) => value is T
): OperatorFunction<Boxed<Observable<unknown>>, Boxed<Observable<T>>> {
  return map(({ value, ...boxedObservable }) => ({
    ...boxedObservable,
    value: value.pipe(assert(predicate)),
  }));
}

export function assertBoxedObservable() {
  return pipe(assert(isBoxedObservable), assertInner(isBoxedValue));
}

// Get unique id for an object
export const objectId = (() => {
  let currentId = 0;
  const map = new WeakMap();

  return (object: object) => {
    if (!map.has(object)) {
      map.set(object, ++currentId);
    }

    return map.get(object);
  };
})();
