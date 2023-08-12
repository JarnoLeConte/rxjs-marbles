import { type V2_MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import examples from "~/examples";

export const meta: V2_MetaFunction = ({ params }) => {
  return [{ title: `${params.example} - RxJS Marbles 3D` }];
};

export default function Example() {
  const { example } = useParams();
  const Scene = examples.find(({ name }) => name === example)?.scene;
  if (!Scene) return null;
  return <Scene />;
}
