import { json, redirect, type LoaderArgs } from "@remix-run/cloudflare";
import { Outlet, useParams } from "@remix-run/react";
import { SceneSetup } from "~/components/SceneSetup";
import type { Example } from "~/examples";

export const loader = ({ params }: LoaderArgs) => {
  if (!params.example) {
    return redirect("/examples/interval");
  }
  return json({ example: params.example });
};

export default function Index() {
  const { example } = useParams<{ example: Example }>();
  return (
    <SceneSetup example={example}>
      <Outlet />
    </SceneSetup>
  );
}
