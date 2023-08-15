import { useEffect } from "react";

export function useBuilder<T>(ref: React.ForwardedRef<T>, build: () => T) {
  useEffect(() => {
    if (ref === null || !("current" in ref)) {
      console.error("useOperatorBuilder: ref is not a ref object");
      return;
    }
    ref.current = build();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
