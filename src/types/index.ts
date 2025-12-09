export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description?: string, dueDate?: Date) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
};

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
