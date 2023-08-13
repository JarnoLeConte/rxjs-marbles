import type { LinksFunction, V2_MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesHref from "./styles.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesHref },
];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RxJS Marbles 3D" },
    {
      name: "description",
      content: "Reactive programming in RxJS visualized with 3D marbles.",
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "c2eaae5e19d24f42a41a9d19b3f25e9f"}'
          />
        )}
      </body>
    </html>
  );
}
