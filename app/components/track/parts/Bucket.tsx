import { Text } from "@react-three/drei";
import type { BallDetectionHandler } from "../../BallDetector";
import { BallDetector } from "../../BallDetector";
import { Element } from "../elements/Element";

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
        <BallDetector position={[0, -1, 0]} onDetection={onBallDetection} />
        <Text
          color="black"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          position={[0, 0.5, 1]}
          fontSize={0.18}
          maxWidth={1.3}
        >
          {displayText}
        </Text>
        <Text
          color="black"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          position={[0, -0.6, 1]}
          fontSize={0.2}
          maxWidth={1.3}
        >
          {contentLabel}
        </Text>
        <Text
          color="black"
          anchorX="center"
          anchorY="middle"
          position={[0, -1.3, 1]}
          fontSize={0.5}
        >
          {content}
        </Text>
      </group>
    </group>
  );
}
