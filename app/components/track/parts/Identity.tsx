import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { pipe } from "rxjs";
import type { OperatorBuilder } from "~/types";
import { makeCodeDefaults } from "~/utils";

export const Identity = forwardRef(function Identity(
  props,
  ref: ForwardedRef<OperatorBuilder>
) {
  useImperativeHandle(
    ref,
    () => ({
      code() {
        return makeCodeDefaults();
      },
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
