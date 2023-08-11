import { useReactiveTrack } from "~/hooks/useReactiveTrack";
import type { Track } from "./track/parts";
import { render } from "./track/render";

export function Run({ track }: { track: Track }) {
  useReactiveTrack(track);
  return render(track);
}
