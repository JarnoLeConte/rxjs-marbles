import type { BallContent } from "./types";

export function randomColor() {
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function renderValue(content?: BallContent): React.ReactNode {
  if (!content) return "-";
  switch (content.type) {
    case "number":
      return content.value;
    case "string":
      return content.value;
    case "boolean":
      return content.value ? "true" : "false";
    case "observable":
      return "O";
  }
}
