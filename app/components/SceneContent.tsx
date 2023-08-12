import { Center } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { Balls } from "~/components/Balls";
import { useStore } from "~/store";
import { Scene, ExampleEnum, defaultExample } from "./Scene";

export function SceneContent() {
  const reset = useStore((state) => state.reset);

  const { example } = useControls("Demo", {
    example: {
      options: Object.values(ExampleEnum),
      value: defaultExample,
    },
  });

  useEffect(() => {
    reset();
  }, [example, reset]);

  const disableCenter = example === "test";

  return (
    <>
      <Balls />
      <Center key={example} disable={disableCenter}>
        <Scene example={example} />
      </Center>
    </>
  );
}
