import type { OperatorFunction } from "rxjs";
import { map } from "rxjs";
import type { Boxed } from "~/types";
import { box } from "~/utils";

export function boxed<V>(
  props?: Partial<Boxed<V>>
): OperatorFunction<any, Boxed<V>> {
  return map((value) => box({ value, ...props }));
}
