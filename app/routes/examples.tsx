import { json, redirect, type LoaderArgs } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";

export const loader = ({ params }: LoaderArgs) => {
  if (!params.example) {
    return redirect("/examples/map");
  }
  return json({ example: params.example });
};

export default function Layout() {
  return <Outlet />;
}
