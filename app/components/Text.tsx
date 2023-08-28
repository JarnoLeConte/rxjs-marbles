import { Center, Plane, Text3D } from "@react-three/drei";
import type { Color, Vector3 } from "@react-three/fiber";
import { useCallback, useState } from "react";
import { DoubleSide } from "three";

type Size = { width: number; height: number };

export function Text({
  children,
  color = "black",
  backgroundColor,
  position,
  fontSize = 0.14,
}: {
  children?: string;
  color?: Color;
  backgroundColor?: Color;
  position?: Vector3;
  fontSize?: number;
}) {
  const [{ width, height }, setSize] = useState<Size>({ width: 0, height: 0 });

  const onCentered = useCallback(({ width, height }: Size) => {
    setSize({ width, height });
  }, []);

  return (
    <group key={children}>
      <Center position={position} onCentered={onCentered}>
        <Text3D
          font="/fonts/Comic Sans MS_Regular.json"
          size={fontSize}
          height={0.001}
        >
          {children}
          <meshStandardMaterial color={color} side={DoubleSide} />
        </Text3D>
      </Center>
      <Plane
        position={position}
        args={[width + 0.1, height + 0.1]}
        visible={!!backgroundColor}
      >
        <meshStandardMaterial color={backgroundColor} />
      </Plane>
    </group>
  );
}
