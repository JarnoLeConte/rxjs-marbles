import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet, useParams } from "@remix-run/react";
import { SceneSetup } from "~/components/SceneSetup";
import type { Example } from "~/examples";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RxJS Marbles 3D" },
    {
      name: "description",
      content: "Reactive programming in RxJS visualized with 3D marbles.",
    },
  ];
};

export default function Index() {
  const { example } = useParams<{ example: Example }>();
  return (
    <SceneSetup example={example}>
      <Outlet />
    </SceneSetup>
  );
}
