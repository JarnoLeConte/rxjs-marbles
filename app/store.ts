import { create } from "zustand";
import type { Ball } from "./types";

let nextId = 1;

interface GameState {
  balls: Ball[];
  addBall: (options: {
    value: any;
    position: [number, number, number];
  }) => void;
  updateBallValue: (id: number, setter: (value: any) => any) => void;
  removeBall: (id: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  balls: [],
  addBall: ({ value, position }) =>
    set((state) => ({
      balls: [
        ...state.balls,
        {
          id: nextId++,
          value,
          defaultPosition: position,
        },
      ],
    })),
  updateBallValue: (id, setter) =>
    set((state) => ({
      balls: state.balls.map((ball) =>
        ball.id === id ? { ...ball, value: setter(ball.value) } : ball
      ),
    })),
  removeBall: (id: number) =>
    set((state) => ({ balls: state.balls.filter((ball) => ball.id !== id) })),
}));
