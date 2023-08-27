import type { Color } from "@react-three/fiber";
import { createRef } from "react";
import type { Observable } from "rxjs";
import { EMPTY } from "rxjs";
import { createStore, useStore as useVanillaStore } from "zustand";
import type { Ball, Boxed, ObservableBuilder, Track, Value } from "./types";

let nextId = 1;

type AddBallOptions = {
  label: string;
  position: [number, number, number];
  color?: Color;
  ghost?: boolean;
};

export type TrackEntry = {
  ref: React.MutableRefObject<ObservableBuilder | null>;
  label: string;
  track: Track;
};

interface Store {
  trackMap: Map<string, TrackEntry>;
  addTrack: (label: string, track: Track) => void;
  getTrackObservable: (label: string) => Observable<Boxed<Value>>;
  getTrackColor: (label: string) => Color | undefined;
  balls: Ball[];
  addBall: (options: AddBallOptions) => number;
  getBall: (id: number) => Ball | undefined;
  updateBall: (id: number, setter: (ball: Ball) => Ball) => void;
  removeBall: (id: number) => void;
  lastActivity: number;
  updateActivity: () => void;
  reset: () => void;
}

export const store = createStore<Store>()((set, get) => ({
  trackMap: new Map(),
  addTrack: (label, track) => {
    set((state) => {
      const ref = createRef<ObservableBuilder>();
      const newEntry: TrackEntry = { ref, label, track };
      const newTrackMap = new Map(state.trackMap).set(label, newEntry);
      return { trackMap: newTrackMap };
    });
  },
  getTrackObservable: (label) => {
    const observable$ = get().trackMap.get(label)?.ref.current?.build();
    if (!observable$) {
      console.warn(`No observable found for track "${label}"`);
    }
    return observable$ ?? EMPTY;
  },
  getTrackColor: (label) => get().trackMap.get(label)?.track.color,
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
          color: color || "#ccc",
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
  reset: () => {
    set({ balls: [], lastActivity: Date.now(), trackMap: new Map() });
  },
}));

export const useStore = <T>(selector: (state: Store) => T) =>
  useVanillaStore(store, selector);
