import { Box, Flex } from "@react-three/flex";
import { useMemo } from "react";
import { frameTimer } from "~/rxjs/frameTimer";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

export function IntervalOperatorDemo() {
  const source$ = useMemo(() => {
    return frameTimer(0, 1);
  }, []);

  return (
    <Flex justifyContent="center" alignItems="flex-end" dir="row">
      <Box centerAnchor>
        <SourceBlock text="interval()" source$={source$} />
      </Box>
      <Box centerAnchor>
        <SinkBlock position-y={-1.75} text=".subscribe(...);" />
      </Box>
    </Flex>
  );
}
