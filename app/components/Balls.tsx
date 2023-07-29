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
          content={ball.content}
          color={ball.color}
          position={ball.defaultPosition}
        />
      ))}
    </>
  );
}
