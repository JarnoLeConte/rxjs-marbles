import { Link } from "@remix-run/react";
import examples from "~/examples";

export function Menu() {
  return (
    <div>
      {examples
        .filter(({ name }) => name !== "test")
        .map(({ name }) => (
          <Link key={name} to={`/examples/${name}`} className="menu-item">
            {name}
          </Link>
        ))}
    </div>
  );
}
