/**
 * Icon utility functions for consistent icon usage across the app
 */

// Import the icon libraries
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Load the fonts
MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();

// Icon mappings for consistent usage across the app
export const APP_ICONS = {
  // Task Status Icons
  TASK_COMPLETED: 'check-circle',
  TASK_PENDING: 'circle-outline',
  TASK_OVERDUE: 'alert-circle',
  TASK_DUE_TODAY: 'clock-alert',
  
  // Action Icons
  ADD: 'plus',
  DELETE: 'delete',
  EDIT: 'pencil',
  SAVE: 'content-save',
  CANCEL: 'close',
  
  // Navigation Icons
  BACK: 'arrow-left',
  FORWARD: 'arrow-right',
  UP: 'arrow-up',
  DOWN: 'arrow-down',
  
  // Media Icons
  MICROPHONE: 'microphone',
  MICROPHONE_OFF: 'microphone-off',
  PLAY: 'play',
  PAUSE: 'pause',
  STOP: 'stop',
  
  // Interface Icons
  MENU: 'menu',
  SEARCH: 'magnify',
  FILTER: 'filter',
  SORT: 'sort',
  SETTINGS: 'cog',
  
  // Date and Time Icons
  CALENDAR: 'calendar',
  CALENDAR_TODAY: 'calendar-today',
  CALENDAR_CLOCK: 'calendar-clock',
  CLOCK: 'clock-outline',
  
  // Theme Icons
  THEME_LIGHT: 'weather-sunny',
  THEME_DARK: 'weather-night',
  
  // Information Icons
  INFO: 'information',
  HELP: 'help-circle-outline',
  WARNING: 'alert',
  ERROR: 'alert-circle',
  
  // List and Content Icons
  LIST: 'format-list-bulleted',
  CLIPBOARD: 'clipboard-text',
  CLIPBOARD_CHECK: 'clipboard-check-multiple',
  TITLE: 'format-title',
  
  // Status Icons
  REQUIRED: 'asterisk',
  CHECK: 'check',
  CLOSE: 'close',
  
  // FAB Icons
  PLUS_CIRCLE: 'plus-circle-outline',
  
  // Chip and Badge Icons
  COMPLETE: 'check-circle-outline',
  INCOMPLETE: 'circle-outline',
};

/**
 * Get icon name with fallback
 */
export const getIconName = (iconKey: keyof typeof APP_ICONS, fallback = 'help-circle'): string => {
  return APP_ICONS[iconKey] || fallback;
};

/**
 * Validate if an icon exists in MaterialCommunityIcons
 */
export const validateIcon = (iconName: string): boolean => {
  try {
    return MaterialCommunityIcons.hasIcon(iconName);
  } catch {
    return false;
  }
};

/**
 * Get safe icon name (returns fallback if icon doesn't exist)
 */
export const getSafeIconName = (iconName: string, fallback = 'help-circle'): string => {
  return validateIcon(iconName) ? iconName : fallback;
};

// Export the icon components for easy import
export { MaterialCommunityIcons, MaterialIcons };

// Default export
export default {
  APP_ICONS,
  getIconName,
  validateIcon,
  getSafeIconName,
  MaterialCommunityIcons,
  MaterialIcons,
};
