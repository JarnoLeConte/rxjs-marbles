import type { Color } from "@react-three/fiber";

export type Ball = {
  id: number;
  value: any;
  defaultPosition: [number, number, number];
  color: Color;
};
