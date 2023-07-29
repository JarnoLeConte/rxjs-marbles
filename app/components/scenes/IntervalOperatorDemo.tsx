import { Box, Flex } from "@react-three/flex";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

export function IntervalOperatorDemo() {
  const producer = useNumberProducer({ start: 0, count: 100 });

  return (
    <Flex justifyContent="center" alignItems="flex-end" dir="row">
      <Box centerAnchor>
        <SourceBlock text="interval()" producer={producer} />
      </Box>
      <Box centerAnchor>
        <SinkBlock position-y={-1.75} text=".subscribe(...);" />
      </Box>
    </Flex>
  );
}
