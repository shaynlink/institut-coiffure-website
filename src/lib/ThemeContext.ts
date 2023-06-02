import { createContext, Dispatch} from "react";

export type Theme = "light" | "dark";

export const ThemeContext = createContext<Theme>('light');
export const ThemeDispatchContext = createContext<Dispatch<Theme> | null>(null);
