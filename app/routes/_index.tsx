import {
  CameraControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import type { PresetsType } from "@react-three/drei/helpers/environment-assets";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import type { V2_MetaFunction } from "@remix-run/node";
import { Leva, useControls } from "leva";
import { Suspense } from "react";
import { Model } from "~/components/Model";
import { WorldScene } from "~/components/WorldScene";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RxJS Marbles" },
    { name: "description", content: "RxJS explained" },
  ];
};

export default function Index() {
  const { scene, ambiance } = useControls("Environment", {
    scene: {
      options: ["model", "world"],
      value: "world",
    },
    ambiance: {
      options: [
        "city",
        "dawn",
        "sunset",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "park",
        "lobby",
      ] as PresetsType[],
      value: "apartment" as PresetsType,
    },
  });

  return (
    <>
      <Leva />
      <Canvas shadows camera={{}}>
        <Suspense>
          <Environment preset={ambiance} />
          <directionalLight
            position={[0, 3, 2]}
            intensity={0.4}
            color="beige"
          />
          <PerspectiveCamera
            makeDefault
            position={[0, 10, 20]}
            fov={30}
            near={0.1}
            far={1000}
          />
          <CameraControls />
          <Physics debug={false}>
            {scene === "model" && <Model />}
            {scene === "world" && <WorldScene />}
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}
