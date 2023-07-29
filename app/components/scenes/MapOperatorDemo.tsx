import { Box, Flex } from "@react-three/flex";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { BallContent } from "~/types";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { MapOperatorBlock } from "../blocks/MapOperatorBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

export function MapOperatorDemo() {
  const producer = useNumberProducer({ start: 1, count: 100 });

  const mapOperation = (content: BallContent): BallContent => {
    switch (content.type) {
      case "number":
        return { type: "number", value: 10 * content.value };
      default:
        throw new Error(
          `At the moment 'map' is not implemented for content type ${content.type}.`
        );
    }
  };

  return (
    <Flex justifyContent="center" alignItems="flex-end" dir="row">
      <Box centerAnchor>
        <SourceBlock producer={producer} />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <MapOperatorBlock text="map((x) => 10 * x)," operation={mapOperation} />
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
