import { type V2_MetaFunction } from "@remix-run/cloudflare";
import { useParams } from "@remix-run/react";
import { Runner } from "~/components/Runner";
import examples from "~/examples";

export const meta: V2_MetaFunction = ({ params }) => {
  return [{ title: `${params.example} - RxJS Marbles 3D` }];
};

export default function Example() {
  const { example } = useParams();
  const foundExample = examples.find(({ name }) => name === example);
  if (!foundExample) return null;
  const { trackRecord } = foundExample;
  return <Runner trackRecord={trackRecord} />;
}
