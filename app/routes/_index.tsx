import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import type { V2_MetaFunction } from "@remix-run/node";
import { Suspense } from "react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RxJS Marbles" },
    { name: "description", content: "RxJS explained" },
  ];
};

export default function Index() {
  return (
    <Canvas shadows>
      <Suspense>
        <Physics debug={false}>
          <Box></Box>
        </Physics>
      </Suspense>
    </Canvas>
  );
}
