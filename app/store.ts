import { create } from "zustand";
import type { Ball } from "./types";

let nextId = 1;

interface GameState {
  balls: Ball[];
  addBall: (options: {
    value: any;
    position: [number, number, number];
  }) => void;
  getBall: (id: number) => Ball | undefined;
  updateBallValue: (id: number, value: any) => void;
  removeBall: (id: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
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
  getBall: (id: number) => get().balls.find((ball) => ball.id === id),
  updateBallValue: (id, value) =>
    set((state) => ({
      balls: state.balls.map((ball) =>
        ball.id === id ? { ...ball, value } : ball
      ),
    })),
  removeBall: (id: number) =>
    set((state) => ({ balls: state.balls.filter((ball) => ball.id !== id) })),
}));
