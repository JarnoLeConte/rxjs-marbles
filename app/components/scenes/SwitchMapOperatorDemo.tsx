import { Box, Flex } from "@react-three/flex";
import { useMemo } from "react";
import { map, of, zip } from "rxjs";
import { frameTimer } from "~/rxjs/frameTimer";
import { tag } from "~/utils";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";
import { SwitchMapBlock } from "../blocks/SwitchMapBlock";

export function SwitchMapOperatorDemo() {
  const source$ = useMemo(() => {
    const A$ = tag("A", frameTimer(0, 1));
    const B$ = tag("B", frameTimer(0, 1));
    const C$ = tag("C", frameTimer(0, 1));
    return zip(frameTimer(0, 2), of(A$, B$, C$)).pipe(map(([, x]) => x));
  }, []);

  return (
    <Flex justifyContent="center" alignItems="flex-end" dir="row">
      <Box centerAnchor>
        <SourceBlock source$={source$} />
      </Box>
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <SwitchMapBlock />
      <Box centerAnchor>
        <ForwardBlock />
      </Box>
      <Box centerAnchor>
        <SinkBlock position-y={-1.75} />
      </Box>
    </Flex>
  );
}
