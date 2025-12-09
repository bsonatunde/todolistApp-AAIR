import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_theme';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provider component for theme management
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  // Load theme preference on mount
  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  // Save theme preference whenever it changes
  useEffect(() => {
    saveThemeToStorage(isDark);
  }, [isDark]);

  /**
   * Load theme preference from AsyncStorage
   */
  const loadThemeFromStorage = async (): Promise<void> => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme !== null) {
        setIsDark(JSON.parse(storedTheme));
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  /**
   * Save theme preference to AsyncStorage
   */
  const saveThemeToStorage = async (theme: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = (): void => {
    setIsDark(prev => !prev);
  };

  const contextValue: ThemeContextType = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 * @returns ThemeContextType
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
