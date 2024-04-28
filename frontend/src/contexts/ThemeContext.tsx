import React, { createContext, Dispatch, SetStateAction, useState } from "react";

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>>
};

type ThemeContextProviderProps = {
  children: React.ReactNode
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {}
});

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider >
  );
};
