import { Center } from "@react-three/drei";
import type { Track } from "~/types";
import { Part } from "./track/parts";
import { Begin } from "./track/parts/Begin";
import { Bucket } from "./track/parts/Bucket";
import { DownHill } from "./track/parts/DownHill";
import { LeftShift } from "./track/parts/LeftShift";
import { Ramp } from "./track/parts/Ramp";
import { RightJoin } from "./track/parts/RightJoin";
import { RightShift } from "./track/parts/RightShift";
import { Straight } from "./track/parts/Straight";
import { Tunnel } from "./track/parts/Tunnel";
import { Concat } from "./track/reactive-parts/Concat";
import { ConcatAll } from "./track/reactive-parts/ConcatAll";
import { Map } from "./track/reactive-parts/Map";
import { Merge } from "./track/reactive-parts/Merge";
import { MergeAll } from "./track/reactive-parts/MergeAll";
import { Producer } from "./track/reactive-parts/Producer";
import { Subscriber } from "./track/reactive-parts/Subscriber";
import { SwitchAll } from "./track/reactive-parts/SwitchAll";

type State = {
  onSubscribe: () => void;
};

export function Render({
  track,
  onSubscribe = () => {},
}: {
  track: Track;
  onSubscribe?: () => void;
}) {
  const state: State = {
    onSubscribe,
  };

  if (!track) return null;

  switch (track.part) {
    case Part.Begin:
      return (
        <group>
          <Begin />
          <group position={[2, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.Bucket:
      return (
        <group>
          <Bucket />
        </group>
      );
    case Part.Straight:
      return (
        <group>
          <Straight />
          <group position={[2, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.Tunnel:
      return (
        <group>
          <Tunnel />
          <group position={[2, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.LeftShift:
      return (
        <group>
          <LeftShift />
          <group position={[4, 0, -2]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.RightShift:
      return (
        <group>
          <RightShift />
          <group position={[4, 0, 2]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.RightJoin:
      return (
        <group position={[0, 0, 0]}>
          <RightJoin />
          <Center left top>
            <Render track={track.incoming[0]} {...state} />
          </Center>
          <Center left top position={[0, 0, -2]}>
            <Render track={track.incoming[1]} {...state} />
          </Center>
          <group position={[6, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.Ramp:
      return (
        <group>
          <Ramp />
          <group position={[2, -1, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.DownHill:
      return (
        <group>
          <DownHill />
          <group position={[4, -1, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.Producer:
      return <Producer {...track.props} next={track.next} {...state} />;
    case Part.Subscriber:
      return <Subscriber {...track.props} {...state} />;
    case Part.Map:
      return (
        <group>
          <Map {...track.props} />
          <group position={[2, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.SwitchAll:
      return (
        <group>
          <SwitchAll />
          <group position={[2, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.ConcatAll:
      return (
        <group>
          <ConcatAll />
          <group position={[2, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.MergeAll:
      return (
        <group>
          <MergeAll />
          <group position={[2, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.Merge:
      return (
        <group position={[0, 0, 0]}>
          <Merge {...track.props} />
          <Center left top>
            <Render track={track.incoming[0]} {...state} />
          </Center>
          <Center left top position={[0, 0, -2]}>
            <Render track={track.incoming[1]} {...state} />
          </Center>
          <group position={[6, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    case Part.Concat: {
      return (
        <group position={[0, 0, 0]}>
          <Concat {...track.props} />
          <Center left top>
            <Render track={track.incoming[0]} {...state} />
          </Center>
          <Center left top position={[0, 0, -2]}>
            <Render track={track.incoming[1]} {...state} />
          </Center>
          <group position={[6, 0, 0]}>
            <Render track={track.next} {...state} />
          </group>
        </group>
      );
    }
    default:
      throw new Error(`Unknown track segment ${track}`);
  }
}
