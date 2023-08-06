import { useControls } from "leva";
import { useEffect } from "react";
import { useSimulator } from "~/hooks/useSimulator";
import { useGameStore } from "~/store";
import { Balls } from "./Balls";
import { ConcatAllOperatorDemo } from "./scenes/ConcatAllOperatorDemo";
import { IntervalOperatorDemo } from "./scenes/IntervalOperatorDemo";
import { MapOperatorDemo } from "./scenes/MapOperatorDemo";
import { MergeAllOperatorDemo } from "./scenes/MergeAllOperatorDemo";
import { Model } from "./scenes/Model";
import { SwitchMapOperatorDemo } from "./scenes/SwitchMapOperatorDemo";

enum Example {
  Dev = "-",
  Map = "map",
  Interval = "interval",
  SwitchMap = "switchMap",
  MergeAll = "mergeAll",
  ConcatAll = "concatAll",
}

export function SceneContent() {
  const reset = useGameStore((state) => state.reset);

  const { example } = useControls("Demo", {
    example: {
      options: Object.values(Example),
      value: Object.values(Example).reverse()[0],
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
      case "mergeAll":
        return <MergeAllOperatorDemo />;
      case "concatAll":
        return <ConcatAllOperatorDemo />;
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
