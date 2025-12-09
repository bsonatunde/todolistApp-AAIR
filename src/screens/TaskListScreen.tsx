import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, Alert, StatusBar } from 'react-native';
import { 
  Text, 
  useTheme as usePaperTheme, 
  Divider,
  IconButton,
  Surface,
  Card,
  Badge,
  Chip
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../types';
import { useTask } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import { TaskItem } from '../components/TaskItem';
import TaskFilters from '../components/TaskFilters';
import { VoiceFAB } from '../components/VoiceFAB';

type TaskListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskList'>;

interface TaskListScreenProps {
  navigation: TaskListScreenNavigationProp;
}

/**
 * Main screen displaying the list of tasks
 */
export const TaskListScreen: React.FC<TaskListScreenProps> = ({ navigation }) => {
  const paperTheme = usePaperTheme();
  const { toggleTheme } = useTheme();
  const { 
    tasks, 
    deleteTask, 
    toggleTask, 
    searchTerm, 
    setSearchTerm 
  } = useTask();

  // Local state for filters and sorting
  const [filterType, setFilterType] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'created' | 'due' | 'title'>('created');

  // Filter and sort tasks based on current settings
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm.trim().length > 0) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply completion filter
    switch (filterType) {
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      // 'all' shows everything, no additional filtering needed
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'due':
          // Tasks without due dates go to the end
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return sorted;
  }, [tasks, searchTerm, filterType, sortBy]);

  // Handle task deletion with confirmation
  const handleDeleteTask = (id: string): void => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteTask(id)
        },
      ]
    );
  };

  // Navigate to Add Task screen
  const handleAddTask = (): void => {
    navigation.navigate('AddTask');
  };

  // Get stats for the header
  const getTaskStats = (): string => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    if (totalTasks === 0) return 'No tasks';
    return `${pendingTasks} pending, ${completedTasks} completed`;
  };

  // Render professional empty state
  const renderEmptyState = (): React.ReactElement => (
    <View style={styles.emptyState}>
      <Surface style={styles.emptyStateCard}>
        <LinearGradient
          colors={[
            paperTheme.colors.surfaceVariant + '20',
            paperTheme.colors.surface,
          ]}
          style={styles.emptyStateGradient}
        >
          <Icon 
            name={searchTerm.trim().length > 0 ? "magnify" : "clipboard-text-outline"} 
            size={80} 
            color={paperTheme.colors.primary} 
            style={styles.emptyIcon}
          />
          <Text 
            variant="headlineMedium" 
            style={[styles.emptyTitle, { color: paperTheme.colors.onSurface }]}
          >
            {searchTerm.trim().length > 0 ? 'No Results Found' : 'Ready to Get Started?'}
          </Text>
          <Text 
            variant="bodyLarge" 
            style={[styles.emptySubtitle, { color: paperTheme.colors.onSurfaceVariant }]}
          >
            {searchTerm.trim().length > 0 
              ? 'Try adjusting your search criteria or clearing filters'
              : 'Create your first task and start organizing your day'
            }
          </Text>
          
          {searchTerm.trim().length === 0 && (
            <View style={styles.emptyActionHints}>
              <Chip icon="plus" mode="outlined" style={styles.actionChip}>
                Add Task
              </Chip>
              <Chip icon="microphone" mode="outlined" style={styles.actionChip}>
                Voice Input
              </Chip>
            </View>
          )}
        </LinearGradient>
      </Surface>
    </View>
  );

  // Render task item
  const renderTaskItem = ({ item }: { item: Task }): React.ReactElement => (
    <TaskItem
      task={item}
      onToggle={toggleTask}
      onDelete={handleDeleteTask}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>
      <StatusBar 
        backgroundColor={paperTheme.colors.surface} 
        barStyle={paperTheme.dark ? 'light-content' : 'dark-content'} 
      />
      
      {/* Professional Gradient Header */}
      <LinearGradient
        colors={[
          paperTheme.colors.primary,
          paperTheme.colors.secondary,
        ]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Surface style={styles.headerSurface}>
          <View style={styles.headerContent}>
            <View style={styles.headerTitleSection}>
              <Icon name="clipboard-check-multiple" size={28} color="white" style={styles.headerIcon} />
              <View>
                <Text variant="headlineSmall" style={styles.headerTitle}>
                  Todo Manager
                </Text>
                <Text variant="bodyMedium" style={styles.headerSubtitle}>
                  {getTaskStats()}
                </Text>
              </View>
            </View>
            
            <View style={styles.headerActions}>
              <IconButton
                icon="weather-night"
                size={24}
                onPress={toggleTheme}
                iconColor="white"
                style={styles.headerActionButton}
              />
              <IconButton
                icon="information"
                size={24}
                onPress={() => Alert.alert(
                  '� TodoList Pro',
                  '✨ Professional Features:\n\n📝 Smart Task Management\n🎤 Voice Recognition\n🔍 Advanced Search & Filter\n📅 Due Date Tracking\n🌙 Dark/Light Themes\n📊 Task Statistics\n💾 Auto-Save'
                )}
                iconColor="white"
                style={styles.headerActionButton}
              />
            </View>
          </View>
        </Surface>
      </LinearGradient>

      {/* Task Statistics Cards */}
      <Surface style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { backgroundColor: paperTheme.colors.primaryContainer }]}>
            <Card.Content style={styles.statContent}>
              <Icon name="clock-outline" size={20} color={paperTheme.colors.onPrimaryContainer} />
              <Text variant="labelSmall" style={{ color: paperTheme.colors.onPrimaryContainer }}>
                Pending
              </Text>
              <Badge style={{ backgroundColor: paperTheme.colors.primary }}>
                {tasks.filter(t => !t.completed).length}
              </Badge>
            </Card.Content>
          </Card>
          
          <Card style={[styles.statCard, { backgroundColor: paperTheme.colors.secondaryContainer }]}>
            <Card.Content style={styles.statContent}>
              <Icon name="check-circle-outline" size={20} color={paperTheme.colors.onSecondaryContainer} />
              <Text variant="labelSmall" style={{ color: paperTheme.colors.onSecondaryContainer }}>
                Completed
              </Text>
              <Badge style={{ backgroundColor: paperTheme.colors.secondary }}>
                {tasks.filter(t => t.completed).length}
              </Badge>
            </Card.Content>
          </Card>
          
          <Card style={[styles.statCard, { backgroundColor: paperTheme.colors.tertiaryContainer }]}>
            <Card.Content style={styles.statContent}>
              <Icon name="format-list-bulleted" size={20} color={paperTheme.colors.onTertiaryContainer} />
              <Text variant="labelSmall" style={{ color: paperTheme.colors.onTertiaryContainer }}>
                Total
              </Text>
              <Badge style={{ backgroundColor: paperTheme.colors.tertiary }}>
                {tasks.length}
              </Badge>
            </Card.Content>
          </Card>
        </View>
      </Surface>

      {/* Filters */}
      <TaskFilters
        searchQuery={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterType}
        onFilterChange={setFilterType}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <Divider />

      {/* Task List */}
      <FlatList
        data={filteredAndSortedTasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <VoiceFAB onAddTaskPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 8,
  },
  headerSurface: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerActionButton: {
    margin: 0,
  },
  statsContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 1,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: 8,
    paddingBottom: 100, // Space for FAB
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyStateCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    width: '100%',
    maxWidth: 400,
  },
  emptyStateGradient: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    marginBottom: 24,
    opacity: 0.8,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  emptySubtitle: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
  emptyActionHints: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  actionChip: {
    marginHorizontal: 4,
  },
});
