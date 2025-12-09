import { 
  formatDate, 
  formatDateTime, 
  isToday, 
  isOverdue, 
  validateTaskTitle, 
  validateTaskDescription,
  truncateText
} from '../src/utils/helpers';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    test('should format date correctly', () => {
      const date = new Date(2023, 11, 25); // Month is 0-indexed, so 11 = December
      const result = formatDate(date);
      expect(result).toMatch(/Dec 25, 2023/);
    });
  });

  describe('formatDateTime', () => {
    test('should format date and time correctly', () => {
      const date = new Date(2023, 11, 25, 15, 30); // Local time: Dec 25, 2023 3:30 PM
      const result = formatDateTime(date);
      expect(result).toMatch(/Dec 25, 2023.*3:30 PM/);
    });
  });

  describe('isToday', () => {
    test('should return true for today\'s date', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    test('should return false for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('isOverdue', () => {
    test('should return true for past date', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isOverdue(yesterday)).toBe(true);
    });

    test('should return false for future date', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isOverdue(tomorrow)).toBe(false);
    });
  });

  describe('validateTaskTitle', () => {
    test('should validate correct title', () => {
      const result = validateTaskTitle('Valid task title');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test('should reject empty title', () => {
      const result = validateTaskTitle('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Task title is required');
    });

    test('should reject short title', () => {
      const result = validateTaskTitle('A');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Task title must be at least 2 characters long');
    });

    test('should reject very long title', () => {
      const longTitle = 'A'.repeat(101);
      const result = validateTaskTitle(longTitle);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Task title must be less than 100 characters');
    });
  });

  describe('validateTaskDescription', () => {
    test('should validate correct description', () => {
      const result = validateTaskDescription('Valid description');
      expect(result.isValid).toBe(true);
    });

    test('should allow empty description', () => {
      const result = validateTaskDescription('');
      expect(result.isValid).toBe(true);
    });

    test('should reject very long description', () => {
      const longDescription = 'A'.repeat(501);
      const result = validateTaskDescription(longDescription);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Description must be less than 500 characters');
    });
  });

  describe('truncateText', () => {
    test('should not truncate short text', () => {
      const text = 'Short text';
      const result = truncateText(text, 20);
      expect(result).toBe('Short text');
    });

    test('should truncate long text', () => {
      const text = 'This is a very long text that should be truncated';
      const result = truncateText(text, 20);
      expect(result).toBe('This is a very lo...');
      expect(result.length).toBe(20);
    });
  });
});
