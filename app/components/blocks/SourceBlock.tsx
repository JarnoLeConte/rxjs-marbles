import { TerminalBlock } from "./TerminalBlock";

type Props = JSX.IntrinsicElements["group"] & {
  text?: string;
};

export function SourceBlock({ text, ...props }: Props) {
  return <TerminalBlock text={text ?? "source$.pipe("} {...props} />;
}
