import type { BallDetectionHandler } from "../BallDetector";
import { Base } from "./Base";
import { TerminalBlock } from "./TerminalBlock";

type Props = JSX.IntrinsicElements["group"] & {
  onBallDetection: BallDetectionHandler;
  text?: string;
};

export function ExchangeBlock({ onBallDetection, text, ...props }: Props) {
  return (
    <group {...props}>
      <TerminalBlock rotation-y={Math.PI} onBallDetection={onBallDetection} />
      <TerminalBlock position={[0, 2, 0]} text={text} />
      <Base block="Cube034" position={[2, 1, 0]} rotation-y={Math.PI / 2} />
    </group>
  );
}
