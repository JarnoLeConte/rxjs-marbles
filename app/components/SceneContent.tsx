import { Center } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { Balls } from "~/components/Balls";
import { useGameStore } from "~/store";
import { Example, ExampleEnum, defaultExample } from "./Example";

export function SceneContent() {
  const reset = useGameStore((state) => state.reset);

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
        <Example example={example} />
      </Center>
    </>
  );
}
