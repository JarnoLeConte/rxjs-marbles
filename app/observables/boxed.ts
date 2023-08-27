import type { OperatorFunction } from "rxjs";
import { map } from "rxjs";
import type { Boxed, Value } from "~/types";
import { box } from "~/utils";

export function boxed(
  props?: Partial<Boxed<Value>>
): OperatorFunction<Value, Boxed<Value>> {
  return map((value) => box({ value, ...props }));
}
