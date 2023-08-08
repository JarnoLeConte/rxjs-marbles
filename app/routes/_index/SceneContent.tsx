import { Center } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { useSimulator } from "~/hooks/useSimulator";
import { useGameStore } from "~/store";
import { Balls } from "~/components/Balls";
import { ConcatAllScene } from "~/scenes/ConcatAllScene";
import { IntervalScene } from "~/scenes/IntervalScene";
import { MapScene } from "~/scenes/MapScene";
import { Model } from "~/scenes/Model";
import { SwitchAllScene } from "~/scenes/SwitchAllScene";
import { MergeAllScene } from "~/scenes/MergeAllScene";
import { ConcatMapScene } from "~/scenes/ConcatMapScene";

enum Example {
  Dev = "-",
  Map = "map",
  Interval = "interval",
  SwitchAll = "switchAll",
  MergeAll = "mergeAll",
  ConcatAll = "concatAll",
  ConcatMap = "concatMap",
  // Test = "test",
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
        return <MapScene />;
      case "interval":
        return <IntervalScene />;
      case "switchAll":
        return <SwitchAllScene />;
      case "mergeAll":
        return <MergeAllScene />;
      case "concatAll":
        return <ConcatAllScene />;
      case "concatMap":
        return <ConcatMapScene />;
      // case "test":
      //   return <TestScene />;
      default:
        return <Model />;
    }
  };

  return (
    <>
      <Balls />
      <Center key={example}>{renderScene()}</Center>
    </>
  );
}
