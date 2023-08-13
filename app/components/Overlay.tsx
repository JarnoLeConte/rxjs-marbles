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
      <div
        style={{
          flexGrow: 0,
          padding: 5,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <span style={{ pointerEvents: "auto" }}>frame: {frame}</span>
        <a
          href="https://github.com/JarnoLeConte/rxjs-marbles"
          style={{ pointerEvents: "auto" }}
          className="hoverable"
        >
          <img
            src="/github-mark-white.svg"
            alt="View on GitHub"
            width={30}
            height={30}
          />
        </a>
      </div>
    </div>
  );
}
