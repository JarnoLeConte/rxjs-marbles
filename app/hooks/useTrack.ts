import { useRef } from "react";
import type { Observable } from "rxjs";
import type { Value } from "~/types";

export function useTrack() {
  const ref = useRef<Observable<Value>>(null!);
  return [ref.current, ref] as const;
}
