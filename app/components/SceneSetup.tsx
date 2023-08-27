import {
  CameraControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { Suspense } from "react";
import { Balls } from "./Balls";
import { Overlay } from "./Overlay";

export function SceneSetup({ children }: { children: React.ReactNode }) {
  const { debug } = useControls("Debug", {
    debug: false,
  });

  return (
    <>
      <Canvas shadows>
        <Suspense>
          <Environment path="/" files="lebombo_1k.hdr" />
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
          <Physics debug={debug}>
            <Balls />
            {children}
          </Physics>
          {debug && <gridHelper />}
          {debug && <axesHelper args={[5]} />}
        </Suspense>
      </Canvas>
      <Overlay />
    </>
  );
}
