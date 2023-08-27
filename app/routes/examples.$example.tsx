import { type V2_MetaFunction } from "@remix-run/cloudflare";
import { useParams } from "@remix-run/react";
import { Runner } from "~/components/Runner";
import { SceneSetup } from "~/components/SceneSetup";
import type { Example } from "~/examples";
import examples from "~/examples";

export const meta: V2_MetaFunction = ({ params }) => {
  return [{ title: `${params.example} - RxJS Marbles 3D` }];
};

export default function Example() {
  const { example: exampleName } = useParams<{ example: Example }>();
  const example = examples.find(({ name }) => name === exampleName);
  const trackRecord = example?.trackRecord ?? {};

  return (
    <SceneSetup>
      <Runner trackRecord={trackRecord} />
    </SceneSetup>
  );
}
