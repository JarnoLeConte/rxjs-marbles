import { useControls } from "leva";
import { MapOperatorDemo } from "./scenes/MapOperatorDemo";
import { Model } from "./scenes/Model";
import { Balls } from "./Balls";
import { useEffect } from "react";
import { useGameStore } from "~/store";
import { useSimulator } from "~/hooks/useSimulator";

export function SceneContent() {
  const reset = useGameStore((state) => state.reset);

  const { example } = useControls("Demo", {
    example: {
      options: ["map operator", "(dev) marble blocks"],
      value: "map operator",
    },
  });

  useEffect(() => {
    reset();
  }, [example, reset]);

  useSimulator();

  const renderScene = () => {
    switch (example) {
      case "map operator":
        return <MapOperatorDemo />;
      default:
        return <Model />;
    }
  };

  return (
    <>
      <Balls />
      {renderScene()}
    </>
  );
}
