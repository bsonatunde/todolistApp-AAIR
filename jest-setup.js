/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

// Mock React Native Voice
jest.mock('@react-native-voice/voice', () => ({
  default: {
    onSpeechStart: jest.fn(),
    onSpeechEnd: jest.fn(),
    onSpeechError: jest.fn(),
    onSpeechResults: jest.fn(),
    start: jest.fn(() => Promise.resolve()),
    stop: jest.fn(() => Promise.resolve()),
    destroy: jest.fn(() => Promise.resolve()),
    removeAllListeners: jest.fn(),
    isAvailable: jest.fn(() => Promise.resolve(true)),
    getSpeechRecognitionServices: jest.fn(() => Promise.resolve(['service'])),
  },
}));

// Mock React Native Linear Gradient
jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props) => React.createElement('View', props, props.children),
  };
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useFocusEffect: jest.fn(),
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

// Mock React Native Paper
jest.mock('react-native-paper', () => {
  const React = require('react');
  return {
    Provider: ({ children, theme }) => children,
    Appbar: {
      Header: ({ children }) => React.createElement('View', {}, children),
      Content: ({ title, subtitle }) => React.createElement('Text', {}, title),
      BackAction: ({ onPress }) => React.createElement('Button', { onPress }, 'Back'),
    },
    Button: ({ children, onPress }) => React.createElement('Button', { onPress }, children),
    Text: ({ children }) => React.createElement('Text', {}, children),
    TextInput: ({ value, onChangeText, ...props }) => 
      React.createElement('TextInput', { value, onChangeText, ...props }),
    Card: {
      Content: ({ children }) => children,
    },
    FAB: ({ onPress, icon, label }) => React.createElement('Button', { onPress }, label || icon),
    IconButton: ({ onPress, icon }) => React.createElement('Button', { onPress }, icon),
    Checkbox: ({ onPress, status }) => React.createElement('Button', { onPress }, status),
    Searchbar: ({ onChangeText, value }) => 
      React.createElement('TextInput', { onChangeText, value }),
    Menu: {
      Item: ({ onPress, title }) => React.createElement('Button', { onPress }, title),
    },
    Divider: () => React.createElement('View'),
    useTheme: () => ({
      colors: {
        primary: '#6200ea',
        background: '#ffffff',
        surface: '#ffffff',
        onSurface: '#000000',
        onSurfaceVariant: '#49454f',
        error: '#ba1a1a',
        secondary: '#03dac6',
        onPrimary: '#ffffff',
        onSecondary: '#000000',
        onBackground: '#000000',
        onError: '#ffffff',
        outline: '#79747e',
        inverseSurface: '#313033',
        inverseOnSurface: '#f4eff4',
        inversePrimary: '#d0bcff',
      },
    }),
    MD3DarkTheme: {
      colors: {
        primary: '#d0bcff',
        background: '#1c1b1f',
        surface: '#1c1b1f',
        onSurface: '#e6e1e5',
        onSurfaceVariant: '#cac4d0',
        error: '#f2b8b5',
        secondary: '#ccc2dc',
        onPrimary: '#381e72',
        onSecondary: '#332d41',
        onBackground: '#e6e1e5',
        onError: '#601410',
        outline: '#938f99',
        inverseSurface: '#e6e1e5',
        inverseOnSurface: '#313033',
        inversePrimary: '#6750a4',
      },
    },
    MD3LightTheme: {
      colors: {
        primary: '#6750a4',
        background: '#fffbfe',
        surface: '#fffbfe',
        onSurface: '#1c1b1f',
        onSurfaceVariant: '#49454f',
        error: '#ba1a1a',
        secondary: '#625b71',
        onPrimary: '#ffffff',
        onSecondary: '#ffffff',
        onBackground: '#1c1b1f',
        onError: '#ffffff',
        outline: '#79747e',
        inverseSurface: '#313033',
        inverseOnSurface: '#f4eff4',
        inversePrimary: '#d0bcff',
      },
    },
  };
});

// Mock React Native Vector Icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock ThemeContext
jest.mock('./src/context/ThemeContext', () => ({
  ThemeProvider: ({ children }) => children,
  useTheme: () => ({
    isDark: false,
    toggleTheme: jest.fn(),
  }),
}));

// Mock TaskContext
jest.mock('./src/context/TaskContext', () => ({
  TaskProvider: ({ children }) => children,
  useTask: () => ({
    tasks: [],
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    toggleTask: jest.fn(),
    searchTerm: '',
    setSearchTerm: jest.fn(),
  }),
}));

// Mock other React Native modules
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@react-native-community/datetimepicker', () => ({
  default: () => null,
}));

// Mock React Native's built-in modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.RNVoice = {
    onSpeechStart: jest.fn(),
    onSpeechEnd: jest.fn(),
    onSpeechError: jest.fn(),
    onSpeechResults: jest.fn(),
    start: jest.fn(() => Promise.resolve()),
    stop: jest.fn(() => Promise.resolve()),
    destroy: jest.fn(() => Promise.resolve()),
    removeAllListeners: jest.fn(),
    isAvailable: jest.fn(() => Promise.resolve(true)),
  };
  
  RN.Alert = {
    alert: jest.fn(),
  };
  
  RN.PermissionsAndroid = {
    PERMISSIONS: {
      RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
    },
    request: jest.fn(() => Promise.resolve('granted')),
  };
  
  return RN;
});
