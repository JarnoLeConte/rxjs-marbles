import { Link } from "@remix-run/react";
import examples from "~/examples";

export function Menu() {
  return (
    <div>
      {examples
        .filter(
          ({ name }) =>
            name !== "test" || process.env.NODE_ENV === "development"
        )
        .map(({ name }) => (
          <Link key={name} to={`/examples/${name}`} className="menu-item">
            {name}
          </Link>
        ))}
    </div>
  );
}
