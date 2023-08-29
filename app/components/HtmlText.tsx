import { Html } from "@react-three/drei";
import type { Vector3 } from "@react-three/fiber";

export function HtmlText({
  children,
  position,
  style,
}: {
  children?: string;
  position?: Vector3;
  style?: React.CSSProperties;
}) {
  return (
    <Html
      occlude="blending"
      as="span"
      position={position}
      transform
      style={{
        background: "#fff",
        color: "black",
        ...style,
      }}
    >
      {children}
    </Html>
  );
}
