import type { Color } from "@react-three/fiber";

export type Tick = number;

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
      producer: Record<Tick, BallContent>;
    };

export type Ball = {
  id: number;
  content: BallContent;
  defaultPosition: [number, number, number];
  color: Color;
};
