import type { OperatorFunction } from "rxjs";

export function initialize<T>(fn: () => void): OperatorFunction<T, T> {
  return (source$) => {
    fn();
    return source$;
  };
}
