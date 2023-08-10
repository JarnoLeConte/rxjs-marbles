import { Center } from "@react-three/drei";
import type { Track } from "~/types";
import { Part } from "./parts";
import { Begin } from "./parts/Begin";
import { Bucket } from "./parts/Bucket";
import { DownHill } from "./parts/DownHill";
import { LeftShift } from "./parts/LeftShift";
import { Ramp } from "./parts/Ramp";
import { RightJoin } from "./parts/RightJoin";
import { RightShift } from "./parts/RightShift";
import { Straight } from "./parts/Straight";
import { Tunnel } from "./parts/Tunnel";
import { Concat } from "./reactive-parts/Concat";
import { ConcatAll } from "./reactive-parts/ConcatAll";
import { Map } from "./reactive-parts/Map";
import { Merge } from "./reactive-parts/Merge";
import { MergeAll } from "./reactive-parts/MergeAll";
import { Producer } from "./reactive-parts/Producer";
import { Subscriber } from "./reactive-parts/Subscriber";
import { SwitchAll } from "./reactive-parts/SwitchAll";

export function render(track: Track) {
  if (!track) return null;

  switch (track.part) {
    case Part.Begin:
      return (
        <group>
          <Begin />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
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
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.Tunnel:
      return (
        <group>
          <Tunnel />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.LeftShift:
      return (
        <group>
          <LeftShift />
          <group position={[4, 0, -2]}>{render(track.next)}</group>
        </group>
      );
    case Part.RightShift:
      return (
        <group>
          <RightShift />
          <group position={[4, 0, 2]}>{render(track.next)}</group>
        </group>
      );
    case Part.RightJoin:
      return (
        <group position={[0, 0, 0]}>
          <RightJoin />
          <Center left top>
            {render(track.incoming[0])}
          </Center>
          <Center left top position={[0, 0, -2]}>
            {render(track.incoming[1])}
          </Center>
          <group position={[6, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.Ramp:
      return (
        <group>
          <Ramp />
          <group position={[2, -1, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.DownHill:
      return (
        <group>
          <DownHill />
          <group position={[4, -1, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.Producer:
      return (
        <group>
          <Producer {...track.props} />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.Subscriber:
      return (
        <group>
          <Subscriber {...track.props} />
        </group>
      );
    case Part.Map:
      return (
        <group>
          <Map {...track.props} />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.SwitchAll:
      return (
        <group>
          <SwitchAll />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.ConcatAll:
      return (
        <group>
          <ConcatAll />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.MergeAll:
      return (
        <group>
          <MergeAll />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.Merge:
      return (
        <group position={[0, 0, 0]}>
          <Merge {...track.props} />
          <Center left top>
            {render(track.incoming[0])}
          </Center>
          <Center left top position={[0, 0, -2]}>
            {render(track.incoming[1])}
          </Center>
          <group position={[6, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case Part.Concat: {
      return (
        <group position={[0, 0, 0]}>
          <Concat {...track.props} />
          <Center left top>
            {render(track.incoming[0])}
          </Center>
          <Center left top position={[0, 0, -2]}>
            {render(track.incoming[1])}
          </Center>
          <group position={[6, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    }
    default:
      throw new Error(`Unknown track segment ${track}`);
  }
}
