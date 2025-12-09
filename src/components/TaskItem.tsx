import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { 
  Card, 
  Text, 
  IconButton, 
  useTheme as usePaperTheme,
  Surface,
  Chip,
  Badge
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Task } from '../types';
import { APP_ICONS, getSafeIconName } from '../utils/iconUtils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
}

/**
 * Individual task item component
 */
export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggle, 
  onDelete, 
  onEdit 
}) => {
  const theme = usePaperTheme();

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const isDueToday = (date?: Date): boolean => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isOverdue = (date?: Date): boolean => {
    if (!date) return false;
    const today = new Date();
    return date < today && !isDueToday(date);
  };



  const getPriorityColor = (): string => {
    if (isOverdue(task.dueDate)) return theme.colors.errorContainer;
    if (isDueToday(task.dueDate)) return theme.colors.primaryContainer;
    if (task.completed) return theme.colors.secondaryContainer;
    return theme.colors.surface;
  };

  const getStatusIcon = (): string => {
    if (task.completed) return getSafeIconName(APP_ICONS.TASK_COMPLETED);
    if (isOverdue(task.dueDate)) return getSafeIconName(APP_ICONS.TASK_OVERDUE);
    if (isDueToday(task.dueDate)) return getSafeIconName(APP_ICONS.TASK_DUE_TODAY);
    return getSafeIconName(APP_ICONS.TASK_PENDING);
  };

  const getStatusColor = (): string => {
    if (task.completed) return theme.colors.primary;
    if (isOverdue(task.dueDate)) return theme.colors.error;
    if (isDueToday(task.dueDate)) return theme.colors.secondary;
    return theme.colors.outline;
  };

  return (
    <Surface style={styles.cardContainer}>
      <Pressable onPress={() => onToggle(task.id)}>
        <Card 
          style={[
            styles.professionalCard, 
            { backgroundColor: getPriorityColor() },
            task.completed && styles.completedCard
          ]} 
          mode="contained"
        >
          <LinearGradient
            colors={[
              getPriorityColor(),
              theme.colors.surface + '80',
            ]}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardContent}>
              {/* Status Icon */}
              <View style={styles.statusSection}>
                <Icon 
                  name={getStatusIcon()} 
                  size={28} 
                  color={getStatusColor()}
                  style={styles.statusIcon}
                />
              </View>

              {/* Main Content */}
              <View style={styles.mainContent}>
                <View style={styles.titleRow}>
                  <Text 
                    style={[
                      styles.professionalTitle, 
                      { color: theme.colors.onSurface },
                      task.completed && styles.completedText
                    ]}
                    numberOfLines={2}
                  >
                    {task.title}
                  </Text>
                  
                  {/* Task Status Badge */}
                  {task.completed && (
                    <Badge style={styles.statusBadge}>
                      Completed
                    </Badge>
                  )}
                </View>

                {task.description && (
                  <Text 
                    style={[
                      styles.professionalDescription, 
                      { color: theme.colors.onSurfaceVariant },
                      task.completed && styles.completedText
                    ]}
                    numberOfLines={2}
                  >
                    {task.description}
                  </Text>
                )}

                {/* Due Date and Metadata */}
                <View style={styles.metadataRow}>
                  {task.dueDate && (
                    <Chip 
                      icon={getSafeIconName(isDueToday(task.dueDate) ? APP_ICONS.CALENDAR_TODAY : APP_ICONS.CALENDAR_CLOCK)}
                      mode="outlined"
                      compact
                      style={[
                        styles.dueDateChip,
                        isOverdue(task.dueDate) && styles.overdueDateChip,
                        isDueToday(task.dueDate) && styles.todayDateChip
                      ]}
                      textStyle={styles.chipText}
                    >
                      {isDueToday(task.dueDate) ? 'Due Today' : 
                       isOverdue(task.dueDate) ? 'Overdue' : 
                       formatDate(task.dueDate)}
                    </Chip>
                  )}
                  
                  <Text 
                    style={[styles.createdDate, { color: theme.colors.onSurfaceVariant }]}
                  >
                    Created {formatDate(task.createdAt)}
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsSection}>
                {onEdit && (
                  <IconButton
                    icon={getSafeIconName(APP_ICONS.EDIT)}
                    size={20}
                    onPress={() => onEdit(task)}
                    iconColor={theme.colors.primary}
                    style={styles.actionButton}
                  />
                )}
                <IconButton
                  icon={getSafeIconName(APP_ICONS.DELETE)}
                  size={20}
                  onPress={() => onDelete(task.id)}
                  iconColor={theme.colors.error}
                  style={styles.actionButton}
                />
              </View>
            </View>
          </LinearGradient>
        </Card>
      </Pressable>
    </Surface>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    elevation: 3,
    overflow: 'hidden',
  },
  professionalCard: {
    borderRadius: 16,
    elevation: 0,
  },
  completedCard: {
    opacity: 0.8,
  },
  cardGradient: {
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  statusSection: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  statusIcon: {
    opacity: 0.9,
  },
  mainContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  professionalTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  professionalDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.8,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  dueDateChip: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  overdueDateChip: {
    backgroundColor: 'rgba(255,0,0,0.1)',
  },
  todayDateChip: {
    backgroundColor: 'rgba(0,100,255,0.1)',
  },
  createdDate: {
    fontSize: 11,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  actionsSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionButton: {
    margin: 0,
  },
  chipText: {
    fontSize: 12,
  },
});
