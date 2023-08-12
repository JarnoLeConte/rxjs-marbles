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
  lastActivity: number;
  updateActivity: () => void;
  frame: number;
  nextFrame: () => void;
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
  lastActivity: Date.now(),
  updateActivity: () => set({ lastActivity: Date.now() }),
  frame: 0,
  nextFrame: () => set((state) => ({ frame: state.frame + 1 })),
  reset: () => set({ balls: [], lastActivity: Date.now(), frame: 0 }),
}));
