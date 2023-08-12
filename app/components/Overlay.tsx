import { useStore } from "~/store";
import { Menu } from "./Menu";

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
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          padding: 5,
        }}
      >
        <Menu />
      </div>
      <div style={{ flexGrow: 0, padding: 5 }}>
        <span style={{ pointerEvents: "auto" }}>frame: {frame}</span>
      </div>
    </div>
  );
}
