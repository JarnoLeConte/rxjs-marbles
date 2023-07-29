import { Box, Flex } from "@react-three/flex";
import { useMemo } from "react";
import type { BallContent, Tick } from "~/types";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { MergeAllBlock } from "../blocks/MergeAllBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

function makeProducer(startValue: number, count: number) {
  const values: BallContent[] = [...Array(count).keys()].map((i) => ({
    type: "number",
    value: startValue + i,
  }));

  return new Map<Tick, BallContent[]>([[0, values]]);
}

export function MergeAllOperatorDemo() {
  const producer = useMemo(
    () =>
      new Map<Tick, BallContent[]>([
        [1, [{ type: "observable", producer: makeProducer(1, 3) }]],
        [2, [{ type: "observable", producer: makeProducer(2, 3) }]],
        [3, [{ type: "observable", producer: makeProducer(3, 3) }]],
      ]),
    []
  );

  return (
    <Flex justifyContent="center" alignItems="flex-end" dir="row">
      <Box centerAnchor>
        <SourceBlock producer={producer} />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <MergeAllBlock />
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <SinkBlock position-y={-1.75} />
      </Box>
    </Flex>
  );
}
