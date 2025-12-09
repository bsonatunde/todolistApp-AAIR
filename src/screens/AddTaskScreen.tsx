import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, StatusBar } from 'react-native';
import { 
  TextInput, 
  Button, 
  useTheme as usePaperTheme,
  Card,
  Text,
  IconButton,
  Surface,
  Chip,
  HelperText,
  ProgressBar,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { APP_ICONS, getSafeIconName } from '../utils/iconUtils';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTask } from '../context/TaskContext';
import DateTimePicker from '@react-native-community/datetimepicker';

type AddTaskScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddTask'>;

interface AddTaskScreenProps {
  navigation: AddTaskScreenNavigationProp;
}

/**
 * Screen for adding new tasks
 */
export const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ navigation }) => {
  const paperTheme = usePaperTheme();
  const { addTask } = useTask();

  // Form state
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Validation state
  const [titleError, setTitleError] = useState<string>('');

  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    let isValid = true;

    // Validate title
    if (!title.trim()) {
      setTitleError('Task title is required');
      isValid = false;
    } else if (title.trim().length < 2) {
      setTitleError('Task title must be at least 2 characters');
      isValid = false;
    } else {
      setTitleError('');
    }

    return isValid;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (): void => {
    if (!validateForm()) {
      return;
    }

    try {
      addTask(
        title.trim(),
        description.trim() || undefined,
        dueDate
      );

      Alert.alert(
        'Task Added',
        `"${title.trim()}" has been added to your tasks.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch {
      Alert.alert('Error', 'Failed to add task. Please try again.');
    }
  };

  /**
   * Handle date picker change
   */
  const handleDateChange = (event: any, selectedDate?: Date): void => {
    try {
      setShowDatePicker(false);
      
      // Handle different event types and platforms
      if (event?.type === 'dismissed' || event?.type === 'neutralButtonPressed') {
        // User dismissed the picker without selecting
        return;
      }
      
      if (selectedDate && selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
        // Ensure the selected date is valid and not in the past
        const now = new Date();
        if (selectedDate < now) {
          Alert.alert(
            '📅 Invalid Date', 
            'Due date cannot be in the past. Please select a future date.',
            [{ text: 'OK' }]
          );
          return;
        }
        setDueDate(selectedDate);
      }
    } catch (error) {
      console.error('Date picker error:', error);
      Alert.alert('Error', 'Failed to set date. Please try again.');
      setShowDatePicker(false);
    }
  };

  /**
   * Clear due date
   */
  const clearDueDate = (): void => {
    setDueDate(undefined);
  };

  /**
   * Format date for display
   */
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const isFormValid = title.trim().length >= 2;
  const completionPercentage = isFormValid ? (dueDate ? 1.0 : 0.7) : (title.trim().length > 0 ? 0.3 : 0);

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
            <IconButton
              icon={getSafeIconName(APP_ICONS.BACK)}
              size={24}
              onPress={() => navigation.goBack()}
              iconColor="white"
            />
            
            <View style={styles.headerTitleSection}>
              <Icon name={getSafeIconName(APP_ICONS.PLUS_CIRCLE)} size={24} color="white" style={styles.headerIcon} />
              <Text variant="headlineSmall" style={styles.headerTitle}>
                Create New Task
              </Text>
            </View>
            
            <IconButton
              icon={getSafeIconName(APP_ICONS.HELP)}
              size={24}
              onPress={() => Alert.alert(
                '💡 Smart Task Creation',
                '🚀 Pro Tips:\n\n📝 Clear & Specific Titles\n📋 Detailed Descriptions\n📅 Smart Due Date Planning\n🎤 Voice Input Support\n⚡ Quick Save Shortcuts\n🎯 Priority Organization'
              )}
              iconColor="white"
            />
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Text variant="labelSmall" style={styles.progressLabel}>
              Form Completion
            </Text>
            <ProgressBar 
              progress={completionPercentage} 
              color="white"
              style={styles.progressBar}
            />
          </View>
        </Surface>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Professional Task Title Section */}
        <Surface style={styles.sectionSurface}>
          <Card style={[styles.professionalCard, { backgroundColor: paperTheme.colors.surfaceVariant }]}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Icon name={getSafeIconName(APP_ICONS.CLIPBOARD)} size={24} color={paperTheme.colors.primary} />
                <Text variant="titleLarge" style={[styles.sectionTitle, { color: paperTheme.colors.primary }]}>
                  Task Information
                </Text>
                <Chip icon={getSafeIconName(APP_ICONS.REQUIRED)} mode="outlined" compact style={styles.requiredChip}>
                  Required
                </Chip>
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Task Title"
                  value={title}
                  onChangeText={(text) => {
                    setTitle(text);
                    if (titleError) setTitleError('');
                  }}
                  mode="outlined"
                  style={styles.professionalInput}
                  error={!!titleError}
                  placeholder="What needs to be done?"
                  maxLength={100}
                  autoFocus
                  left={<TextInput.Icon icon={getSafeIconName(APP_ICONS.TITLE)} />}
                  right={<TextInput.Icon icon={getSafeIconName(title.length > 0 ? APP_ICONS.CHECK : APP_ICONS.TASK_PENDING)} />}
                />
                <HelperText type={titleError ? "error" : "info"} visible={true}>
                  {titleError || `${title.length}/100 characters - Be specific and clear`}
                </HelperText>
              </View>
            </Card.Content>
          </Card>
        </Surface>

        {/* Professional Description Section */}
        <Surface style={styles.sectionSurface}>
          <Card style={[styles.professionalCard, { backgroundColor: paperTheme.colors.surface }]}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Icon name="text-box-outline" size={24} color={paperTheme.colors.secondary} />
                <Text variant="titleLarge" style={[styles.sectionTitle, { color: paperTheme.colors.secondary }]}>
                  Additional Details
                </Text>
                <Chip icon="information-outline" mode="outlined" compact style={styles.optionalChip}>
                  Optional
                </Chip>
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Task Description"
                  value={description}
                  onChangeText={setDescription}
                  mode="outlined"
                  style={[styles.professionalInput, styles.multilineInput]}
                  placeholder="Add context, steps, or important notes..."
                  multiline
                  numberOfLines={4}
                  maxLength={500}
                  left={<TextInput.Icon icon="text-box" />}
                />
                <View style={styles.descriptionFooter}>
                  <HelperText type="info" visible={true}>
                    Rich descriptions help you remember task details
                  </HelperText>
                  <Text 
                    variant="bodySmall" 
                    style={[styles.characterCount, { color: paperTheme.colors.onSurfaceVariant }]}
                  >
                    {description.length}/500
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </Surface>

        {/* Professional Due Date Section */}
        <Surface style={styles.sectionSurface}>
          <Card style={[styles.professionalCard, { backgroundColor: paperTheme.colors.tertiaryContainer }]}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Icon name="calendar-clock" size={24} color={paperTheme.colors.tertiary} />
                <Text variant="titleLarge" style={[styles.sectionTitle, { color: paperTheme.colors.tertiary }]}>
                  Schedule & Timing
                </Text>
                <Chip icon="clock-outline" mode="outlined" compact style={styles.optionalChip}>
                  Optional
                </Chip>
              </View>
              
              {dueDate ? (
                <Surface style={styles.dateDisplayCard}>
                  <View style={styles.dateDisplayContent}>
                    <View style={styles.dateInfo}>
                      <Icon name="calendar-check" size={20} color={paperTheme.colors.primary} />
                      <View style={styles.dateTexts}>
                        <Text variant="bodyLarge" style={styles.dateText}>
                          {formatDate(dueDate)}
                        </Text>
                        <Text 
                          variant="bodySmall" 
                          style={[styles.timeText, { color: paperTheme.colors.onSurfaceVariant }]}
                        >
                          at {dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dateActions}>
                      <IconButton
                        icon="pencil"
                        size={20}
                        onPress={() => setShowDatePicker(true)}
                        iconColor={paperTheme.colors.primary}
                      />
                      <IconButton
                        icon="close-circle"
                        size={20}
                        onPress={clearDueDate}
                        iconColor={paperTheme.colors.error}
                      />
                    </View>
                  </View>
                </Surface>
              ) : (
                <View style={styles.datePickerContainer}>
                  <Button
                    mode="contained-tonal"
                    onPress={() => {
                      try {
                        setShowDatePicker(true);
                      } catch (error) {
                        console.error('Failed to open date picker:', error);
                        Alert.alert('Error', 'Failed to open date picker. Please try again.');
                      }
                    }}
                    icon="calendar-plus"
                    style={styles.professionalDateButton}
                    contentStyle={styles.dateButtonContent}
                  >
                    Schedule Due Date
                  </Button>
                  <HelperText type="info" visible={true}>
                    Set a deadline to stay organized and on track
                  </HelperText>
                </View>
              )}
            </Card.Content>
          </Card>
        </Surface>

        {/* Professional Action Section */}
        <Surface style={styles.actionSurface}>
          <LinearGradient
            colors={[
              paperTheme.colors.surface,
              paperTheme.colors.surfaceVariant + '50',
            ]}
            style={styles.actionGradient}
          >
            <View style={styles.actionContainer}>
              <Text variant="titleMedium" style={styles.actionTitle}>
                Ready to Create?
              </Text>
              <Text variant="bodyMedium" style={[styles.actionSubtitle, { color: paperTheme.colors.onSurfaceVariant }]}>
                {isFormValid ? 'Your task looks great! Save it now.' : 'Please complete the required fields above.'}
              </Text>
              
              <View style={styles.professionalButtonContainer}>
                <Button
                  mode="outlined"
                  onPress={() => navigation.goBack()}
                  style={styles.cancelButton}
                  icon="arrow-left"
                  contentStyle={styles.buttonContent}
                >
                  Cancel
                </Button>
                
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={!isFormValid}
                  style={[styles.submitButton, isFormValid ? styles.submitButtonActive : styles.submitButtonDisabled]}
                  icon="check-circle"
                  contentStyle={styles.buttonContent}
                >
                  Create Task
                </Button>
              </View>
            </View>
          </LinearGradient>
        </Surface>
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
          maximumDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
          textColor={paperTheme.colors.onSurface}
          accentColor={paperTheme.colors.primary}
          themeVariant={paperTheme.dark ? 'dark' : 'light'}
        />
      )}
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  progressBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionSurface: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 2,
    overflow: 'hidden',
  },
  professionalCard: {
    borderRadius: 16,
    elevation: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    flex: 1,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  requiredChip: {
    backgroundColor: 'rgba(255,0,0,0.1)',
  },
  optionalChip: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  inputContainer: {
    marginTop: 8,
  },
  professionalInput: {
    marginBottom: 4,
  },
  multilineInput: {
    minHeight: 120,
  },
  descriptionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characterCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  datePickerContainer: {
    marginTop: 8,
  },
  professionalDateButton: {
    marginBottom: 8,
  },
  dateDisplayCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    elevation: 1,
  },
  dateDisplayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateTexts: {
    marginLeft: 12,
  },
  dateText: {
    fontWeight: '600',
  },
  timeText: {
    marginTop: 2,
  },
  dateActions: {
    flexDirection: 'row',
  },
  actionSurface: {
    marginTop: 8,
    borderRadius: 16,
    elevation: 3,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 24,
  },
  actionContainer: {
    alignItems: 'center',
  },
  actionTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actionSubtitle: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  professionalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 12,
  },
  submitButton: {
    flex: 1,
    borderRadius: 12,
    elevation: 2,
  },
  submitButtonActive: {
    opacity: 1,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  dateButtonContent: {
    paddingVertical: 8,
  },
});
