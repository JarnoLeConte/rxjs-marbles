import { Box, Flex } from "@react-three/flex";
import { useMemo } from "react";
import { frameTimer } from "~/rxjs/frameTimer";
import type { Value } from "~/types";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { MapOperatorBlock } from "../blocks/MapOperatorBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

export function MapOperatorDemo() {
  const source$ = useMemo(() => {
    return frameTimer(0, 1);
  }, []);

  const projection = (value: Value): Value => {
    switch (typeof value) {
      case "number":
        return value * 10;
      default:
        throw new Error(
          `At the moment 'map' is not implemented for content type ${value}.`
        );
    }
  };

  return (
    <Flex justifyContent="center" alignItems="flex-end" dir="row">
      <Box centerAnchor>
        <SourceBlock source$={source$} />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <MapOperatorBlock text="map((x) => 10 * x)," project={projection} />
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
