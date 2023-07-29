import { useEffect, useRef } from "react";
import { timer, zip } from "rxjs";
import { Vector3 } from "three";
import { useGameStore } from "~/store";
import type { Producer } from "~/types";
import { TerminalBlock } from "./TerminalBlock";

type Props = JSX.IntrinsicElements["group"] & {
  text?: string;
  producer?: Producer;
};

export function SourceBlock({ text, producer, ...props }: Props) {
  const tick = useGameStore((state) => state.tick);
  const addBall = useGameStore((state) => state.addBall);
  const ref = useRef<THREE.Group>(null!);

  // Every tick, check if a ball needs to be created by the producer
  useEffect(() => {
    const contentValues = producer?.get(tick);
    if (!contentValues) return;

    // Read producer configuration to know if ball needs to be created.
    // Add a delay between balls, even within the same tick, because
    // balls may not collide and we are animating the processing order.
    const sub = zip(contentValues, timer(0, 800)).subscribe(([content]) => {
      // Initial ball ppsition
      const position = ref.current
        .localToWorld(new Vector3(-0.05, 0, 0)) // start from inside the wall to give the ball a push
        .toArray();

      // Create the ball
      addBall({ content, position });
    });

    return () => sub.unsubscribe();
  }, [addBall, tick, producer]);

  return (
    <group ref={ref} {...props}>
      <TerminalBlock text={text ?? "source$.pipe("} />
    </group>
  );
}
