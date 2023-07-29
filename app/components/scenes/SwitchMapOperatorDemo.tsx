import { Box, Flex } from "@react-three/flex";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";
import { SwitchMapBlock } from "../blocks/SwitchMapBlock";

export function SwitchMapOperatorDemo() {
  const producer = useNumberProducer({ start: 1, count: 100 });

  return (
    <Flex justifyContent="center" alignItems="flex-end" dir="row">
      <Box centerAnchor>
        <SourceBlock producer={producer} />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <SwitchMapBlock />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <SinkBlock position-y={-1.75} />
      </Box>
    </Flex>
  );
}
