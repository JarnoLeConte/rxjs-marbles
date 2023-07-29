import { useFlexSize } from "@react-three/flex";
import { useEffect, useState } from "react";

export function useReflowKey() {
  const [x, y, z] = useFlexSize();
  const [count, setCount] = useState(0);

  // Increase counter if flexbox size changes
  useEffect(() => {
    setCount((c) => c + 1);
  }, [x, y, z]);

  return count;
}
