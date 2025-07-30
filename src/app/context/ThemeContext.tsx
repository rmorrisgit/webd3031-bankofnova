// src\app\context\ThemeContext.tsx
'use client';

import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { baselightTheme } from '../../utils/theme/DefaultColors';
import { basedarkTheme } from '../../utils/theme/DefaultColors';
// src\utils\theme\DefaultColors.tsx
const ThemeModeContext = createContext({
  toggleTheme: () => {},
  mode: 'light' as 'light' | 'dark',
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  const theme = useMemo(() => (mode === 'dark' ? basedarkTheme : baselightTheme), [mode]);

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
