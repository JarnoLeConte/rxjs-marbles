import type { BallDetectionHandler } from "../BallDetector";
import { BallDetector } from "../BallDetector";
import { Txt } from "../Txt";
import { Element } from "./Element";
import { Stopper } from "./Stopper";

type Props = JSX.IntrinsicElements["group"] & {
  onBallDetection?: BallDetectionHandler;
  entryClosed?: boolean;
  exitClosed?: boolean;
  displayText?: string;
};

export function Tunnel({
  onBallDetection,
  entryClosed,
  exitClosed,
  displayText,
  ...props
}: Props) {
  return (
    <group {...props}>
      <group position={[1, 1, 0]}>
        <Element name="Cube062" rotation={[0, Math.PI / 2, 0]} />
        <BallDetector position={[0, 0, 0]} onDetection={onBallDetection} />
        {entryClosed && <Stopper position={[-0.99, 0, 0]} />}
        {exitClosed && <Stopper position={[0.99, 0, 0]} />}
        {displayText && (
          <Txt position={[0, -0.5, 1]} maxWidth={1.7}>
            {displayText}
          </Txt>
        )}
      </group>
    </group>
  );
}
