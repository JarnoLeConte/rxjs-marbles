import { Box, Flex } from "@react-three/flex";
import { useMemo } from "react";
import { map, of, take, zip } from "rxjs";
import { frameTimer } from "~/rxjs/frameTimer";
import { tag } from "~/utils";
import { ConcatAllBlock } from "../blocks/ConcatAllBlock";
import { ForwardBlock } from "../blocks/ForwardBlock";
import { SinkBlock } from "../blocks/SinkBlock";
import { SourceBlock } from "../blocks/SourceBlock";

export function ConcatAllOperatorDemo() {
  const source$ = useMemo(() => {
    const A$ = tag("A", frameTimer(0, 1).pipe(take(3)));
    const B$ = tag("B", frameTimer(0, 2).pipe(take(3)));
    const C$ = tag("C", frameTimer(0, 3).pipe(take(3)));
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
      <ConcatAllBlock />
      <Box centerAnchor>
        <SinkBlock position-y={-1.75} />
      </Box>
    </Flex>
  );
}
