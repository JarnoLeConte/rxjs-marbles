import { Link, useLocation } from "@remix-run/react";
import examples from "~/examples";

export function Menu() {
  const { pathname } = useLocation();
  return (
    <div>
      {examples
        .filter(
          ({ name }) =>
            name !== "test" || process.env.NODE_ENV === "development"
        )
        .map(({ name }) => (
          <Link
            key={name}
            to={`/examples/${name}`}
            className={`menu-item ${
              pathname === `/examples/${name}` ? "active" : ""
            }`}
          >
            {name}
          </Link>
        ))}
    </div>
  );
}
