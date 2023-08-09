import { Center } from "@react-three/drei";
import type { Track } from "~/types";
import { ConcatAll } from "./interactive/ConcatAll";
import { Map } from "./interactive/Map";
import { MergeAll } from "./interactive/MergeAll";
import { Producer } from "./interactive/Producer";
import { Subscriber } from "./interactive/Subscriber";
import { SwitchAll } from "./interactive/SwitchAll";
import { TrackSegment } from "./segements";
import { Begin } from "./segments/Begin";
import { Bucket } from "./segments/Bucket";
import { DownHill } from "./segments/DownHill";
import { LeftShift } from "./segments/LeftShift";
import { Ramp } from "./segments/Ramp";
import { RightJoin } from "./segments/RightJoin";
import { RightShift } from "./segments/RightShift";
import { Straight } from "./segments/Straight";
import { Tunnel } from "./segments/Tunnel";
import { Merge } from "./interactive/Merge";

export function render(track: Track) {
  if (!track) return null;

  switch (track.segment) {
    case TrackSegment.Begin:
      return (
        <group>
          <Begin />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.Bucket:
      return (
        <group>
          <Bucket />
        </group>
      );
    case TrackSegment.Straight:
      return (
        <group>
          <Straight />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.Tunnel:
      return (
        <group>
          <Tunnel />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.LeftShift:
      return (
        <group>
          <LeftShift />
          <group position={[4, 0, -2]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.RightShift:
      return (
        <group>
          <RightShift />
          <group position={[4, 0, 2]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.RightJoin:
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
    case TrackSegment.Ramp:
      return (
        <group>
          <Ramp />
          <group position={[2, -1, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.DownHill:
      return (
        <group>
          <DownHill />
          <group position={[4, -1, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.Producer:
      return (
        <group>
          <Producer {...track.props} />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.Subscriber:
      return (
        <group>
          <Subscriber {...track.props} />
        </group>
      );
    case TrackSegment.Map:
      return (
        <group>
          <Map {...track.props} />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.SwitchAll:
      return (
        <group>
          <SwitchAll />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.ConcatAll:
      return (
        <group>
          <ConcatAll />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.MergeAll:
      return (
        <group>
          <MergeAll />
          <group position={[2, 0, 0]}>{render(track.next)}</group>
        </group>
      );
    case TrackSegment.Merge:
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
    default:
      throw new Error(`Unknown track segment ${track}`);
  }
}
