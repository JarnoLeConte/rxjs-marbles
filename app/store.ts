import type { Color } from "@react-three/fiber";
import { createStore, useStore as useVanillaStore } from "zustand";
import type { Ball } from "./types";
import { randomColor } from "./utils";

let nextId = 1;

interface Store {
  balls: Ball[];
  addBall: (options: {
    label: string;
    position: [number, number, number];
    color?: Color;
    ghost?: boolean;
  }) => number;
  getBall: (id: number) => Ball | undefined;
  updateBall: (id: number, setter: (ball: Ball) => Ball) => void;
  removeBall: (id: number) => void;
  lastActivity: number;
  updateActivity: () => void;
  reset: () => void;
}

export const store = createStore<Store>()((set, get) => ({
  balls: [],
  addBall: ({ label, position, color, ghost }) => {
    get().updateActivity();
    const id = nextId++;
    set((state) => ({
      balls: [
        ...state.balls,
        {
          id,
          label,
          defaultPosition: position,
          color: color || randomColor(),
          ghost,
        },
      ],
    }));
    return id;
  },
  getBall: (id: number) => get().balls.find((ball) => ball.id === id),
  updateBall: (id, setter) => {
    get().updateActivity();
    set((state) => ({
      balls: state.balls.map((ball) => (ball.id === id ? setter(ball) : ball)),
    }));
  },
  removeBall: (id: number) =>
    set((state) => ({ balls: state.balls.filter((ball) => ball.id !== id) })),
  lastActivity: Date.now(),
  updateActivity: () => set({ lastActivity: Date.now() }),
  reset: () => set({ balls: [], lastActivity: Date.now() }),
}));

export const useStore = <T>(selector: (state: Store) => T) =>
  useVanillaStore(store, selector);
