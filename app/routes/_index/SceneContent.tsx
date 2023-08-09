import { Center } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { Balls } from "~/components/Balls";
import { useSimulator } from "~/hooks/useSimulator";
import { ConcatAllScene } from "~/scenes/ConcatAllScene";
import { ConcatMapScene } from "~/scenes/ConcatMapScene";
import { IntervalScene } from "~/scenes/IntervalScene";
import { MapScene } from "~/scenes/MapScene";
import { MergeAllScene } from "~/scenes/MergeAllScene";
import { MergeScene } from "~/scenes/MergeScene";
import { Model } from "~/scenes/Model";
import { SwitchAllScene } from "~/scenes/SwitchAllScene";
import { TestScene } from "~/scenes/TestScene";
import { useGameStore } from "~/store";

enum Example {
  Dev = "-",
  Map = "map",
  Interval = "interval",
  SwitchAll = "switchAll",
  MergeAll = "mergeAll",
  ConcatAll = "concatAll",
  ConcatMap = "concatMap",
  Merge = "merge",
  Test = "test",
}

export function SceneContent() {
  const reset = useGameStore((state) => state.reset);

  const { example } = useControls("Demo", {
    example: {
      options: Object.values(Example),
      value: Example.Merge,
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
      case "merge":
        return <MergeScene />;
      case "test":
        return <TestScene />;
      default:
        return <Model />;
    }
  };

  const disableCenter = example === "test";

  return (
    <>
      <Balls />
      <Center key={example} disable={disableCenter}>
        {renderScene()}
      </Center>
    </>
  );
}
