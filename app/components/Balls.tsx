import { useStore } from "~/store";
import { Ball } from "./Ball";

export function Balls() {
  const balls = useStore((state) => state.balls);

  return (
    <>
      {balls.map((ball) => (
        <Ball
          key={ball.id}
          id={ball.id}
          value={ball.value}
          color={ball.color}
          position={ball.defaultPosition}
        />
      ))}
    </>
  );
}
