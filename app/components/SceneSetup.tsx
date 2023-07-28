import {
  CameraControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import type { PresetsType } from "@react-three/drei/helpers/environment-assets";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { SceneContent } from "~/components/SceneContent";

export function SceneSetup() {
  const { ambiance, debug } = useControls("Environment", {
    debug: false,
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
      <Environment preset={ambiance} />
      <directionalLight position={[0, 3, 2]} intensity={0.4} color="beige" />
      <PerspectiveCamera
        makeDefault
        position={[0, 10, 20]}
        fov={30}
        near={0.1}
        far={1000}
      />
      <CameraControls />
      <Physics debug={debug}>
        <SceneContent />
      </Physics>
    </>
  );
}
