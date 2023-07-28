import { create } from "zustand";
import type { Ball } from "./types";
import type { Color } from "@react-three/fiber";
import { randomColor } from "./utils";

let nextId = 1;

interface GameState {
  balls: Ball[];
  addBall: (options: {
    value: any;
    position: [number, number, number];
    color?: Color;
  }) => void;
  getBall: (id: number) => Ball | undefined;
  updateBall: (id: number, setter: (ball: Ball) => Ball) => void;
  removeBall: (id: number) => void;
  tick: number;
  nextTick: () => void;
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

  tick: 0,
  nextTick: () => set((state) => ({ tick: state.tick + 1 })),
}));
