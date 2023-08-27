import { Text } from "@react-three/drei";
import type { Color, Vector3 } from "@react-three/fiber";

export function Text2D({
  children,
  color = "black",
  position,
  opacity,
  fontSize = 0.18,
  maxWidth,
}: {
  children?: string;
  color?: Color;
  position?: Vector3;
  opacity?: number;
  fontSize?: number;
  maxWidth?: number;
}) {
  return (
    <Text
      color={color}
      font="/fonts/NanumGothic-Bold.ttf"
      anchorX="center"
      anchorY="middle"
      textAlign="center"
      position={position}
      fontSize={fontSize}
      fillOpacity={opacity}
      maxWidth={maxWidth}
    >
      {children}
    </Text>
  );
}
