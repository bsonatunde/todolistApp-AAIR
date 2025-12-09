/**
 * Utility functions for the TodoList app
 */

/**
 * Format a date to a human-readable string
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Format a date with time to a human-readable string
 * @param date Date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Check if a date is today
 * @param date Date to check
 * @returns True if the date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Check if a date is overdue (before today)
 * @param date Date to check
 * @returns True if the date is overdue
 */
export const isOverdue = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
};

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 * @param date Date to get relative time for
 * @returns Relative time string
 */
export const getRelativeTimeString = (date: Date): string => {
  const now = new Date();
  const diffInMilliseconds = date.getTime() - now.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (Math.abs(diffInDays) >= 1) {
    return diffInDays > 0 ? `in ${diffInDays} day${diffInDays > 1 ? 's' : ''}` : `${Math.abs(diffInDays)} day${Math.abs(diffInDays) > 1 ? 's' : ''} ago`;
  } else if (Math.abs(diffInHours) >= 1) {
    return diffInHours > 0 ? `in ${diffInHours} hour${diffInHours > 1 ? 's' : ''}` : `${Math.abs(diffInHours)} hour${Math.abs(diffInHours) > 1 ? 's' : ''} ago`;
  } else if (Math.abs(diffInMinutes) >= 1) {
    return diffInMinutes > 0 ? `in ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}` : `${Math.abs(diffInMinutes)} minute${Math.abs(diffInMinutes) > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
};

/**
 * Generate a unique ID
 * @returns Unique ID string
 */
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

/**
 * Validate task title
 * @param title Title to validate
 * @returns Object with isValid boolean and error message
 */
export const validateTaskTitle = (title: string): { isValid: boolean; error?: string } => {
  if (!title || title.trim().length === 0) {
    return { isValid: false, error: 'Task title is required' };
  }
  
  if (title.trim().length < 2) {
    return { isValid: false, error: 'Task title must be at least 2 characters long' };
  }
  
  if (title.trim().length > 100) {
    return { isValid: false, error: 'Task title must be less than 100 characters' };
  }
  
  return { isValid: true };
};

/**
 * Validate task description
 * @param description Description to validate
 * @returns Object with isValid boolean and error message
 */
export const validateTaskDescription = (description: string): { isValid: boolean; error?: string } => {
  if (description && description.length > 500) {
    return { isValid: false, error: 'Description must be less than 500 characters' };
  }
  
  return { isValid: true };
};

/**
 * Truncate text to specified length with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
