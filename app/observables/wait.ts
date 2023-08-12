import { ignoreElements, timer } from "rxjs";

export function wait(duration: number) {
  return timer(duration).pipe(ignoreElements());
}
