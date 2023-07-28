import { useGameStore } from "~/store";
import { Ball } from "./Ball";

export function Balls() {
  const balls = useGameStore((state) => state.balls);

  return (
    <>
      {balls.map((ball) => (
        <Ball
          key={ball.id}
          id={ball.id}
          value={ball.value}
          position={ball.defaultPosition}
        />
      ))}
    </>
  );
}
