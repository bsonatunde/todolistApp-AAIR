import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskContextType } from '../types';
import { StorageService } from '../services/StorageService';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

/**
 * Provider component for task management context
 */
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Load tasks from storage on mount
  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  // Save tasks to storage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0 || tasks.length === 0) {
      StorageService.saveTasks(tasks).catch(error => {
        console.error('Failed to save tasks:', error);
      });
    }
  }, [tasks]);

  /**
   * Load tasks from AsyncStorage
   */
  const loadTasksFromStorage = async (): Promise<void> => {
    try {
      const storedTasks = await StorageService.loadTasks();
      setTasks(storedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  /**
   * Generate a unique ID for new tasks
   */
  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  /**
   * Add a new task
   * @param title Task title
   * @param description Optional task description
   * @param dueDate Optional due date
   */
  const addTask = (title: string, description?: string, dueDate?: Date): void => {
    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      createdAt: new Date(),
      dueDate,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  /**
   * Update an existing task
   * @param id Task ID
   * @param updates Partial task object with updates
   */
  const updateTask = (id: string, updates: Partial<Task>): void => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  /**
   * Delete a task
   * @param id Task ID
   */
  const deleteTask = (id: string): void => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  /**
   * Toggle task completion status
   * @param id Task ID
   */
  const toggleTask = (id: string): void => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const contextValue: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    searchTerm,
    setSearchTerm,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

/**
 * Hook to use task context
 * @returns TaskContextType
 */
export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
