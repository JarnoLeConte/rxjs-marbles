import { Outlet, useParams } from "@remix-run/react";
import { SceneSetup } from "~/components/SceneSetup";
import type { Example } from "~/examples";

export default function Index() {
  const { example } = useParams<{ example: Example }>();
  return (
    <SceneSetup example={example}>
      <Outlet />
    </SceneSetup>
  );
}
