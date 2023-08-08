import { useMemo } from "react";
import { frameTimer } from "~/rxjs/frameTimer";

export function useNumberProducer() {
  return useMemo(() => {
    return frameTimer(0, 1);
  }, []);
}
