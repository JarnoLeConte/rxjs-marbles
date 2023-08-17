import { map, throwError, type Observable, type OperatorFunction } from "rxjs";
import type { TaggedObservable, Value } from "./types";

export function randomColor() {
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function numberToChar(index: number, startChar = "A") {
  const startCharCode = startChar.charCodeAt(0);
  return String.fromCharCode(startCharCode + index);
}

export function isTaggedObservable(value: Value): value is TaggedObservable {
  return typeof value === "object" && "observable$" in value;
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
        return `[${value.map(renderValue).join(", ")}]`;
      }
      if (isTaggedObservable(value)) {
        return value.label;
      }
    default:
      throw new Error(`Unknown value type ${value}`);
  }
}

export function tag(
  label: string,
  observable$: Observable<Value>
): TaggedObservable {
  return { observable$, label };
}

export function assertObservable(): OperatorFunction<Value, Observable<Value>> {
  return map<Value, Observable<Value>>((value) =>
    isTaggedObservable(value)
      ? value.observable$
      : throwError(
          () => new Error(`Expected an observable value, but got: ${value}`)
        )
  );
}
