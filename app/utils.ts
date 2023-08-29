import {
  isObservable,
  map,
  mergeMap,
  of,
  throwError,
  type Observable,
  type OperatorFunction,
} from "rxjs";
import type {
  Boxed,
  Code,
  ObservableBuilder,
  OperatorBuilder,
  RealValue,
  Value,
} from "./types";

export enum CollisionGroup {
  Track = 0,
  Ball = 1,
  Detector = 2,
}

export enum Color {
  Red = "#dc5d78",
  Green = "#2bd065",
  Blue = "#2b7dd0",
  // Cyan = "#4ca9d4",
  // Lime = "#88d02b",
  Yellow = "#e2cc33",
  Orange = "#e1923f",
  Purple = "#d13a9e",
}

export function randomColor() {
  const colors = Object.values(Color);
  return colors[Math.floor(Math.random() * colors.length)];
}

export function numberToChar(index: number, startChar = "A") {
  const startCharCode = startChar.charCodeAt(0);
  return String.fromCharCode(startCharCode + index);
}

export function box(
  props: Required<Pick<Boxed<Value>, "value">> & Partial<Boxed<Value>>
): Boxed<Value> {
  return {
    ...props,
    color: props.color ?? randomColor(),
    label: props.label ?? renderValue(props.value),
  };
}

export function unbox<V extends Value>(boxedValue: Boxed<V>): V {
  return boxedValue.value;
}

export function unboxDeep<V extends Value>(boxedValue: Boxed<V>): RealValue {
  const value = unbox(boxedValue);
  if (isObservable(value)) {
    return value.pipe(map(unboxDeep));
  }
  if (Array.isArray(value)) {
    return value.map(unboxDeep);
  }
  return value;
}

export function renderBoxedValue(boxedValue: Boxed<Value>): string {
  return boxedValue.label ?? renderValue(unbox(boxedValue));
}

export function renderValue(value?: Value): string {
  if (value === undefined || value === null) return "-";
  switch (typeof value) {
    case "number":
      return `${value}`;
    case "string":
      return `"${value}"`;
    case "boolean":
      return value ? "true" : "false";
    case "object":
      if (Array.isArray(value)) {
        return `[${value.map(renderBoxedValue).join(", ")}]`;
      }
    default:
      throw new Error(`Unknown value type ${value}`);
  }
}

export function isBoxedObservable(
  boxedValue: Boxed<Value>
): boxedValue is Boxed<Observable<Boxed<Value>>> {
  return isObservable(unbox(boxedValue));
}

export function assertBoxedObservable(): OperatorFunction<
  Boxed<Value>,
  Boxed<Observable<Boxed<Value>>>
> {
  return mergeMap((boxedValue) =>
    isBoxedObservable(boxedValue)
      ? of(boxedValue)
      : throwError(
          () =>
            new Error(`Expected an boxed observable, but got: ${boxedValue}`)
        )
  );
}

// Get unique id for an object
export const objectId = (() => {
  let currentId = 0;
  const map = new WeakMap();

  return (object: object) => {
    if (!map.has(object)) {
      map.set(object, ++currentId);
    }

    return map.get(object);
  };
})();

// Generate code
export const makeCode = (code: Code): string => {
  const imports = Array.from(new Set(code.imports));
  return `import { ${imports.join(
    ", "
  )} } from "rxjs";\n\n${code.code.trim()}.subscribe({ \n\tnext: console.log\n});`;
};

export const makeCodeCombinator = (
  operator: string,
  a: ObservableBuilder,
  b: ObservableBuilder,
  tail: OperatorBuilder
): Code => {
  const codeA = a.code();
  const codeB = b.code();
  const codeTail = tail.code();
  const pipe = codeTail.code.trim() ? `.pipe(${codeTail.code.trim()})` : "";
  return {
    imports: [
      `${operator}`,
      ...codeA.imports,
      ...codeB.imports,
      ...codeTail.imports,
    ],
    code: [
      `const a$ = ${codeA.code}`,
      `const b$ = ${codeB.code}`,
      `${operator}(a$, b$)${pipe}`,
    ].join(";\n\n"),
  };
};

export const makeCodeOperator = (
  operator: string,
  args: string[],
  tail: OperatorBuilder
): Code => {
  const { imports: tailImports, code: tailCode } = tail.code();
  return {
    imports: [operator, ...tailImports],
    code: [`${operator}(${args.join(", ")})`, `${tailCode.trim()}`]
      .filter(Boolean)
      .join(", "),
  };
};

export const makeCodeDefaults = () => ({
  imports: [],
  code: "",
});
