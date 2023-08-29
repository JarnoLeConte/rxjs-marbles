import { EMPTY } from "rxjs";
import { Part } from "~/components/track/parts";
import type { Track } from "~/types";

const track: Track = {
  part: Part.Producer,
  props: {
    source$: EMPTY,
    sourceCode: {
      imports: ["EMPTY"],
      code: `EMPTY`,
    },
  },
  tail: null,
};

export default {
  main: track,
};
