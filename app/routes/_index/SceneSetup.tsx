import {
  CameraControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { SceneContent } from "./SceneContent";

export function SceneSetup() {
  const { debug } = useControls("Debug", {
    debug: true,
  });

  return (
    <>
      <Environment path="/" files="lebombo_1k.hdr" />
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
      {debug && <gridHelper />}
      {debug && <axesHelper args={[5]} />}
    </>
  );
}
