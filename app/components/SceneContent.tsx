import { useControls } from "leva";
import { useEffect } from "react";
import { useSimulator } from "~/hooks/useSimulator";
import { useGameStore } from "~/store";
import { Balls } from "./Balls";
import { IntervalOperatorDemo } from "./scenes/IntervalOperatorDemo";
import { MapOperatorDemo } from "./scenes/MapOperatorDemo";
import { Model } from "./scenes/Model";
import { SwitchMapOperatorDemo } from "./scenes/SwitchMapOperatorDemo";

enum Example {
  Map = "map",
  Interval = "interval",
  SwitchMap = "switchMap",
  Dev = "[DEV] marble blocks",
}

export function SceneContent() {
  const reset = useGameStore((state) => state.reset);

  const { example } = useControls("Demo", {
    example: {
      options: Object.values(Example),
      value: "map" || Object.values(Example)[0],
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
      case "switchMap":
        return <SwitchMapOperatorDemo />;
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
