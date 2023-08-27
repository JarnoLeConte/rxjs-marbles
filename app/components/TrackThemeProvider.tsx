import type { Color } from "@react-three/fiber";
import { createContext, useContext } from "react";

export type TrackTheme = {
  color?: Color;
};

const intialValue: TrackTheme = {
  color: undefined,
};

const context = createContext(intialValue);

export function TrackThemeProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: TrackTheme;
}) {
  value ??= intialValue;
  return <context.Provider value={value}>{children}</context.Provider>;
}

export function useTrackTheme() {
  return useContext(context);
}
