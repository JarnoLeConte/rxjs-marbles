import { Center } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { Balls } from "~/components/Balls";
import { Model } from "~/components/Model";
import { ConcatAll } from "~/examples/ConcatAll";
import { ConcatMap } from "~/examples/ConcatMap";
import { Interval } from "~/examples/Interval";
import { Map } from "~/examples/Map";
import { Merge } from "~/examples/Merge";
import { MergeAll } from "~/examples/MergeAll";
import { SwitchAll } from "~/examples/SwitchAll";
import { Test } from "~/examples/Test";
import { useSimulator } from "~/hooks/useSimulator";
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
        return <Map />;
      case "interval":
        return <Interval />;
      case "switchAll":
        return <SwitchAll />;
      case "mergeAll":
        return <MergeAll />;
      case "concatAll":
        return <ConcatAll />;
      case "concatMap":
        return <ConcatMap />;
      case "merge":
        return <Merge />;
      case "test":
        return <Test />;
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
