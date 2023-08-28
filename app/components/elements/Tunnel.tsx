import type { BallDetectionHandler } from "../BallDetector";
import { BallDetector } from "../BallDetector";
import { Text2D } from "../Text2D";
import { Element } from "./Element";
import { Stopper } from "./Stopper";

type Props = JSX.IntrinsicElements["group"] & {
  onBallDetection?: BallDetectionHandler;
  onBeforeEnter?: BallDetectionHandler;
  entryClosed?: boolean;
  exitClosed?: boolean;
  displayText?: string;
  upperText?: string;
};

export function Tunnel({
  onBallDetection,
  onBeforeEnter,
  entryClosed,
  exitClosed,
  displayText,
  upperText,
  ...props
}: Props) {
  return (
    <group {...props}>
      <group position={[1, 1, 0]}>
        <Element name="Cube062" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[0.2, 0, 0]} onEnter={onBallDetection} />
        <BallDetector position={[-1, 0, 0]} onEnter={onBeforeEnter} />
        {entryClosed && <Stopper position={[-0.99, 0, 0]} />}
        {exitClosed && <Stopper position={[0.99, 0, 0]} />}
        {displayText && (
          <Text2D position={[0, -0.5, 1]} maxWidth={1.7}>
            {displayText}
          </Text2D>
        )}
        {upperText && (
          <Text2D position={[0, 0.5, 1]} maxWidth={1.7}>
            {upperText}
          </Text2D>
        )}
      </group>
    </group>
  );
}
