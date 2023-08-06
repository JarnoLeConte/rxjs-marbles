import { filter, scan } from "rxjs";
import { frame$ } from "./frame$";

export const frameInterval = (period: number) => {
  return frame$.pipe(
    scan((acc) => acc + 1, 0), // frame index counter 1, 2, 3, 4...
    filter((tick) => tick % period === 0), // emit every nth frame
    scan((acc) => acc + 1, -1) // output value 0, 1, 2, 3...
  );
};
