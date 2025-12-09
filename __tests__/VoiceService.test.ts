import { VoiceService } from '../src/services/VoiceService';

describe('VoiceService', () => {
  describe('extractTasks', () => {
    test('should extract single task', () => {
      const result = VoiceService.extractTasks('Buy milk');
      expect(result).toEqual(['Buy milk']);
    });

    test('should extract multiple tasks with "and" separator', () => {
      const result = VoiceService.extractTasks('Buy milk and call mom');
      expect(result).toEqual(['Buy milk', 'Call mom']);
    });

    test('should extract multiple tasks with various separators', () => {
      const result = VoiceService.extractTasks('Buy groceries and call dentist then pay bills');
      expect(result).toEqual(['Buy groceries', 'Call dentist', 'Pay bills']);
    });

    test('should handle empty or whitespace input', () => {
      expect(VoiceService.extractTasks('')).toEqual([]);
      expect(VoiceService.extractTasks('   ')).toEqual([]);
    });

    test('should remove common prefixes', () => {
      const result = VoiceService.extractTasks('I need to buy milk and I have to call mom');
      expect(result).toEqual(['Buy milk', 'Call mom']);
    });

    test('should capitalize first letter of tasks', () => {
      const result = VoiceService.extractTasks('buy milk and call mom');
      expect(result).toEqual(['Buy milk', 'Call mom']);
    });

    test('should handle complex natural language', () => {
      const result = VoiceService.extractTasks('I need to buy groceries and then call mom, also pay the electricity bill');
      expect(result).toEqual(['Buy groceries', 'Call mom', 'Pay the electricity bill']);
    });

    test('should filter out very short tasks', () => {
      const result = VoiceService.extractTasks('a and buy milk and b');
      expect(result).toEqual(['Buy milk']);
    });
  });
});
