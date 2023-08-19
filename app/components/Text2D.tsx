import { Text } from "@react-three/drei";
import type { Vector3 } from "@react-three/fiber";

export function Text2D({
  children,
  position,
  opacity,
  fontSize = 0.18,
  maxWidth,
}: {
  children?: string;
  position?: Vector3;
  opacity?: number;
  fontSize?: number;
  maxWidth?: number;
}) {
  return (
    <Text
      color="black"
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
