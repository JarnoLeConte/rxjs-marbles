import { Sphere } from "@react-three/drei";

export function Ball(props: JSX.IntrinsicElements["group"]) {
  const radius = 0.59;

  return (
    <group {...props} dispose={null}>
      <Sphere args={[radius]}>
        <meshStandardMaterial color={0xbbbbbb} metalness={1} roughness={0} />
      </Sphere>
    </group>
  );
}
