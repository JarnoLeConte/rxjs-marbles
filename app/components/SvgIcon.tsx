import { Center, Svg } from "@react-three/drei";
import type { Color, Vector3 } from "@react-three/fiber";
import { DoubleSide } from "three";

type Icon = "clock-filled";

export function SvgIcon({
  icon,
  color = "black",
  position,
}: {
  icon: Icon;
  color?: Color;
  position?: Vector3;
}) {
  return (
    <group position={position}>
      <Center>
        <Svg
          src={`/icons/${icon}.svg`}
          scale={0.02}
          fillMaterial={{
            color,
            side: DoubleSide,
          }}
        />
      </Center>
    </group>
  );
}
