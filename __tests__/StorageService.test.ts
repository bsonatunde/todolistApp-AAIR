import { StorageService } from '../src/services/StorageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../src/types';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('StorageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveTasks', () => {
    test('should save tasks to AsyncStorage', async () => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          completed: false,
          createdAt: new Date('2023-01-01'),
        },
      ];

      mockAsyncStorage.setItem.mockResolvedValue();

      await StorageService.saveTasks(tasks);

      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'todo_tasks',
        JSON.stringify(tasks)
      );
    });

    test('should throw error if saving fails', async () => {
      const tasks: Task[] = [];
      mockAsyncStorage.setItem.mockRejectedValue(new Error('Storage error'));

      await expect(StorageService.saveTasks(tasks)).rejects.toThrow('Failed to save tasks');
    });
  });

  describe('loadTasks', () => {
    test('should load tasks from AsyncStorage', async () => {
      const tasksJson = JSON.stringify([
        {
          id: '1',
          title: 'Test Task',
          completed: false,
          createdAt: '2023-01-01T00:00:00.000Z',
        },
      ]);

      mockAsyncStorage.getItem.mockResolvedValue(tasksJson);

      const result = await StorageService.loadTasks();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Task');
      expect(result[0].createdAt).toBeInstanceOf(Date);
    });

    test('should return empty array if no tasks stored', async () => {
      mockAsyncStorage.getItem.mockResolvedValue(null);

      const result = await StorageService.loadTasks();

      expect(result).toEqual([]);
    });

    test('should return empty array if loading fails', async () => {
      mockAsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));

      const result = await StorageService.loadTasks();

      expect(result).toEqual([]);
    });
  });

  describe('clearTasks', () => {
    test('should remove tasks from AsyncStorage', async () => {
      mockAsyncStorage.removeItem.mockResolvedValue();

      await StorageService.clearTasks();

      expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith('todo_tasks');
    });

    test('should throw error if clearing fails', async () => {
      mockAsyncStorage.removeItem.mockRejectedValue(new Error('Storage error'));

      await expect(StorageService.clearTasks()).rejects.toThrow('Failed to clear tasks');
    });
  });
});
