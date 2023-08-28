import type { BallDetectionHandler } from "../BallDetector";
import { BallDetector } from "../BallDetector";
import { Text } from "../Text";
import { Element } from "./Element";

type Props = JSX.IntrinsicElements["group"] & {
  onBallDetection?: BallDetectionHandler;
  displayText?: string;
  contentLabel?: string;
  content?: string;
};

export function Bucket({
  onBallDetection,
  displayText,
  contentLabel,
  content,
  ...props
}: Props) {
  return (
    <group {...props}>
      <group position={[1, 0, 0]}>
        <Element name="Cube703" rotation={[0, Math.PI, 0]} />
        <Element
          name="Cube061"
          position={[0, -2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <BallDetector position={[0, 1, 0]} />
        <BallDetector position={[0, -1, 0]} onEnter={onBallDetection} />
        <Text position={[0, 0.5, 1]}>{displayText}</Text>
        <Text position={[0, -0.6, 1]}>{contentLabel}</Text>
        <Text position={[0, -1.3, 1]} fontSize={0.39}>
          {content}
        </Text>
      </group>
    </group>
  );
}
