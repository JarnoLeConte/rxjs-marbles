import { useControls } from "leva";
import { MapOperatorDemo } from "./scenes/MapOperatorDemo";
import { Model } from "./scenes/Model";
import { Balls } from "./Balls";
import { useEffect } from "react";
import { useGameStore } from "~/store";
import { useSimulator } from "~/hooks/useSimulator";
import { IntervalOperatorDemo } from "./scenes/IntervalOperatorDemo";

enum Example {
  Map = "map",
  Interval = "interval",
  Dev = "[DEV] marble blocks",
}

export function SceneContent() {
  const reset = useGameStore((state) => state.reset);

  const { example } = useControls("Demo", {
    example: {
      options: Object.values(Example),
      value: Object.values(Example)[0],
    },
  });

  useEffect(() => {
    reset();
  }, [example, reset]);

  useSimulator();

  const renderScene = () => {
    switch (example) {
      case "map":
        return <MapOperatorDemo />;
      case "interval":
        return <IntervalOperatorDemo />;
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
