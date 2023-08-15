import { useRef } from "react";
import type { OperatorFunction } from "rxjs";
import type { Value } from "~/types";

export function useTail() {
  const ref = useRef<OperatorFunction<Value, Value>>(null!);
  return {
    get() {
      return ref.current;
    },
    ref,
  };
}
