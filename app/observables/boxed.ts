import type { OperatorFunction } from "rxjs";
import { map } from "rxjs";
import type { Boxed, Value } from "~/types";
import { box } from "~/utils";

export function boxed(): OperatorFunction<Value, Boxed<Value>> {
  return map((value) => box(value));
}
