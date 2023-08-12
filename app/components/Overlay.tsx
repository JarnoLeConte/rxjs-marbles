import { useStore } from "~/store";

export function Overlay() {
  const frame = useStore((state) => state.frame);
  return (
    <div
      id="overlay"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div style={{ pointerEvents: "auto", padding: 5 }}>frame: {frame}</div>
    </div>
  );
}
