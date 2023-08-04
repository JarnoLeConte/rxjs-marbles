import type { Color } from "@react-three/fiber";

export type Tick = number;

export type Producer = Map<Tick, BallContent[]>;

export type BallContent =
  | {
      type: "number";
      value: number;
    }
  | {
      type: "string";
      value: string;
    }
  | {
      type: "boolean";
      value: boolean;
    }
  | {
      type: "observable";
      label: string; // observable name
      producer: Producer;
    };

export type Ball = {
  id: number;
  content: BallContent;
  defaultPosition: [number, number, number];
  color: Color;
};
