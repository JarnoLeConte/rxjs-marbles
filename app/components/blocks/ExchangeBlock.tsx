import { Center } from "@react-three/drei";
import type { BallDetectionHandler } from "../BallDetector";
import { Base } from "./Base";
import { TerminalBlock } from "./TerminalBlock";

type Props = JSX.IntrinsicElements["group"] & {
  onBallDetection: BallDetectionHandler;
  textBottom?: string;
  textTop?: string;
};

export function ExchangeBlock({
  onBallDetection,
  textBottom,
  textTop,
  ...props
}: Props) {
  return (
    <group {...props}>
      <Center>
        <group position-y={-1}>
          <TerminalBlock
            text={textBottom}
            rotation-y={Math.PI}
            onBallDetection={onBallDetection}
          />
          <Base block="Cube034" position={[2, 0, 0]} rotation-y={Math.PI / 2} />
        </group>
        <group position-y={1}>
          <TerminalBlock text={textTop} />
        </group>
      </Center>
    </group>
  );
}
