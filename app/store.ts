import type { Color } from "@react-three/fiber";
import { create } from "zustand";
import type { Ball, Value } from "./types";
import { randomColor } from "./utils";

let nextId = 1;

interface GameState {
  balls: Ball[];
  addBall: (options: {
    value: Value;
    position: [number, number, number];
    color?: Color;
  }) => void;
  getBall: (id: number) => Ball | undefined;
  updateBall: (id: number, setter: (ball: Ball) => Ball) => void;
  removeBall: (id: number) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  balls: [],
  addBall: ({ value, position, color }) =>
    set((state) => ({
      balls: [
        ...state.balls,
        {
          id: nextId++,
          value,
          defaultPosition: position,
          color: color || randomColor(),
        },
      ],
    })),
  getBall: (id: number) => get().balls.find((ball) => ball.id === id),
  updateBall: (id, setter) =>
    set((state) => ({
      balls: state.balls.map((ball) => (ball.id === id ? setter(ball) : ball)),
    })),
  removeBall: (id: number) =>
    set((state) => ({ balls: state.balls.filter((ball) => ball.id !== id) })),
  reset: () => set({ balls: [] }),
}));
