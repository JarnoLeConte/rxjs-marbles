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
          label={ball.label}
          color={ball.color}
          position={ball.defaultPosition}
          ghost={ball.ghost}
        />
      ))}
    </>
  );
}
