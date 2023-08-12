import { filter, scan, skip, startWith } from "rxjs";
import { frame$ } from "./frame$";

export const frameTimer = (startFrame: number, intervalDuration: number) => {
  return frame$.pipe(
    startWith(void 0), // emit a value immediately, not waiting for the next frame
    skip(startFrame),
    scan((acc) => acc + 1, -1), // frame index counter 0, 1, 2, 3, 4...
    filter((frame) => frame % intervalDuration === 0), // emit every nth frame
    scan((acc) => acc + 1, -1) // output value 0, 1, 2, 3...
  );
};
