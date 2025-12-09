/**
 * React Native Vector Icons Configuration
 * This file ensures that all icon fonts are properly loaded
 */

import { Platform } from 'react-native';

// Import all the icon libraries we're using
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

/**
 * Initialize icon fonts
 */
export const initializeIcons = async (): Promise<void> => {
  try {
    // Load icon fonts
    await MaterialCommunityIcons.loadFont();
    await MaterialIcons.loadFont();
    
    console.log('✅ Icons loaded successfully');
  } catch (error) {
    console.warn('⚠️ Error loading icons:', error);
  }
};

/**
 * Check if icons are loaded
 */
export const checkIconsLoaded = (): boolean => {
  try {
    // Check if the main icon we use exists
    return MaterialCommunityIcons.hasIcon('check-circle');
  } catch {
    return false;
  }
};

/**
 * Platform-specific icon configuration
 */
export const ICON_CONFIG = {
  defaultSize: Platform.select({
    ios: 22,
    android: 24,
    default: 24,
  }),
  
  defaultColor: Platform.select({
    ios: '#000000',
    android: '#000000',
    default: '#000000',
  }),
  
  // Font family names for different platforms
  fontFamily: Platform.select({
    ios: {
      MaterialCommunityIcons: 'MaterialCommunityIcons',
      MaterialIcons: 'MaterialIcons',
    },
    android: {
      MaterialCommunityIcons: 'MaterialCommunityIcons',
      MaterialIcons: 'MaterialIcons',
    },
    default: {
      MaterialCommunityIcons: 'MaterialCommunityIcons',
      MaterialIcons: 'MaterialIcons',
    },
  }),
};

// Export icon libraries for easy access
export { MaterialCommunityIcons, MaterialIcons };

export default {
  initializeIcons,
  checkIconsLoaded,
  ICON_CONFIG,
  MaterialCommunityIcons,
  MaterialIcons,
};
