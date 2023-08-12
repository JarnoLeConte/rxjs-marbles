import { Canvas } from "@react-three/fiber";
import type { V2_MetaFunction } from "@remix-run/node";
import { Leva } from "leva";
import { Suspense } from "react";
import { Overlay } from "~/components/Overlay";
import { SceneSetup } from "~/components/SceneSetup";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RxJS Marbles 3D" },
    {
      name: "description",
      content: "Reactive programming in RxJS visualized with 3D marbles.",
    },
  ];
};

export default function Index() {
  return (
    <>
      <Leva />
      <Canvas shadows>
        <Suspense>
          <SceneSetup />
        </Suspense>
      </Canvas>
      <Overlay />
    </>
  );
}
