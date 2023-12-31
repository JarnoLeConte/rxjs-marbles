import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { EMPTY } from "rxjs";
import type { ObservableBuilder } from "~/types";

export const Empty = forwardRef(function Empty(
  props,
  ref: ForwardedRef<ObservableBuilder>
) {
  useImperativeHandle(
    ref,
    () => ({
      observable() {
        return EMPTY;
      },
      build() {
        return EMPTY;
      },
    }),
    []
  );

  return null;
});
