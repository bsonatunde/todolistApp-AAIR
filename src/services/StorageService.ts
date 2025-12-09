import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

const TASKS_STORAGE_KEY = 'todo_tasks';

/**
 * Service for managing task data persistence using AsyncStorage
 */
export class StorageService {
  /**
   * Save tasks to AsyncStorage
   * @param tasks Array of tasks to save
   */
  static async saveTasks(tasks: Task[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw new Error('Failed to save tasks');
    }
  }

  /**
   * Load tasks from AsyncStorage
   * @returns Promise<Task[]> Array of tasks
   */
  static async loadTasks(): Promise<Task[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (jsonValue !== null) {
        const tasks = JSON.parse(jsonValue);
        // Convert date strings back to Date objects
        return tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  /**
   * Clear all tasks from storage
   */
  static async clearTasks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing tasks:', error);
      throw new Error('Failed to clear tasks');
    }
  }
}
