import React, { useEffect } from 'react';
import { StatusBar, Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Context Providers
import { TaskProvider } from './src/context/TaskContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Components
import { ErrorBoundary } from './src/components/ErrorBoundary';

// Screens
import { TaskListScreen } from './src/screens/TaskListScreen';
import { AddTaskScreen } from './src/screens/AddTaskScreen';

// Types
import { RootStackParamList } from './src/types';

// Services
import { VoiceService } from './src/services/VoiceService';

// Icon configuration
import { initializeIcons } from './src/config/iconConfig';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Main navigation component
 */
const AppNavigator: React.FC = () => {
  const { isDark } = useTheme();

  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.surface}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // We'll use custom headers in screens
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen 
            name="TaskList" 
            component={TaskListScreen}
            options={{ title: 'Todo List' }}
          />
          <Stack.Screen 
            name="AddTask" 
            component={AddTaskScreen}
            options={{ 
              title: 'Add Task',
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

/**
 * Request necessary permissions on Android
 */
const requestAndroidPermissions = async (): Promise<void> => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ];

    const granted = await PermissionsAndroid.requestMultiple(permissions);
    
    Object.entries(granted).forEach(([permission, result]) => {
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(`${permission} permission granted`);
      } else {
        console.log(`${permission} permission denied`);
      }
    });
  } catch (error) {
    console.error('Permission request failed:', error);
  }
};

/**
 * Initialize app services and permissions
 */
const initializeApp = async (): Promise<void> => {
  try {
    // Initialize icons
    await initializeIcons();
    
    // Initialize voice service
    await VoiceService.initialize();

    // Request permissions on Android
    if (Platform.OS === 'android') {
      await requestAndroidPermissions();
    }
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
};

/**
 * Root App component with all providers
 */
const App: React.FC = () => {
  useEffect(() => {
    // Initialize app services
    initializeApp();
    
    // Cleanup on unmount
    return () => {
      VoiceService.cleanup();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <TaskProvider>
              <AppNavigator />
            </TaskProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
};

export default App;
