import { Subject } from "rxjs";
import type { Value } from "~/types";

export type Notification = {
  type: "emit";
  producer: string;
  value: Value;
};

export const notification$ = new Subject<Notification>();
