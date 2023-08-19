import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import type { Track } from "~/types";

export function Test() {
  const track: Track = {
    part: Part.Producer,
    tail: null,
  };

  return <Run track={track} />;
}
