/**
 * App-wide constants
 */

// Storage Keys
export const STORAGE_KEYS = {
  TASKS: 'todo_tasks',
  THEME: 'app_theme',
  USER_PREFERENCES: 'user_preferences',
} as const;

// Task Limits
export const TASK_LIMITS = {
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  TITLE_MIN_LENGTH: 2,
} as const;

// Voice Recognition
export const VOICE_CONFIG = {
  LANGUAGE: 'en-US',
  TIMEOUT_MS: 10000,
  MAX_ALTERNATIVES: 1,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  SEARCH_DEBOUNCE_MS: 300,
  ANIMATION_DURATION_MS: 250,
  FAB_MARGIN: 16,
  CARD_MARGIN: 4,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',
  ISO: 'YYYY-MM-DDTHH:mm:ss.sssZ',
} as const;

// Filter Types
export const FILTER_TYPES = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;

// Sort Types
export const SORT_TYPES = {
  CREATED: 'created',
  DUE: 'due',
  TITLE: 'title',
} as const;

// App Messages
export const MESSAGES = {
  TASK_ADDED: 'Task added successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  TASK_COMPLETED: 'Task marked as completed',
  TASK_UNCOMPLETED: 'Task marked as pending',
  VOICE_ERROR: 'Voice recognition failed. Please try again.',
  PERMISSION_DENIED: 'Microphone permission is required for voice input',
  NO_TASKS: 'No tasks found',
  EMPTY_TITLE_ERROR: 'Task title cannot be empty',
} as const;

// Voice Task Separators
export const VOICE_SEPARATORS = [
  ' and ',
  ' then ',
  ' also ',
  ' plus ',
  ' & ',
  ', and ',
  ', then ',
  ', also ',
] as const;

// Voice Prefixes to Remove
export const VOICE_PREFIXES = [
  'i need to ',
  'i have to ',
  'i should ',
  'need to ',
  'have to ',
  'should ',
  'remind me to ',
  'add task to ',
] as const;
