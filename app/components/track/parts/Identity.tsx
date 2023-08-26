import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { pipe } from "rxjs";
import type { OperatorBuilder } from "~/types";

export const Identity = forwardRef(function Identity(
  props,
  ref: ForwardedRef<OperatorBuilder>
) {
  useImperativeHandle(
    ref,
    () => ({
      operator() {
        return pipe();
      },
      build() {
        return pipe();
      },
    }),
    []
  );

  return null;
});
