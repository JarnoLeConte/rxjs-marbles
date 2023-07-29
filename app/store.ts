import { create } from "zustand";
import type { Ball, BallContent, Tick } from "./types";
import type { Color } from "@react-three/fiber";
import { randomColor } from "./utils";

let nextId = 1;

interface GameState {
  balls: Ball[];
  addBall: (options: {
    content: BallContent;
    position: [number, number, number];
    color?: Color;
  }) => void;
  getBall: (id: number) => Ball | undefined;
  updateBall: (id: number, setter: (ball: Ball) => Ball) => void;
  removeBall: (id: number) => void;
  tick: Tick;
  nextTick: () => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  balls: [],
  addBall: ({ content, position, color }) =>
    set((state) => ({
      balls: [
        ...state.balls,
        {
          id: nextId++,
          content,
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
  reset: () => set({ balls: [], tick: 0 }),
}));
