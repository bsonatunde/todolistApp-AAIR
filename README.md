# TodoList App - React Native

A comprehensive Todo List application built with React Native, TypeScript, and modern UI components. This app features task management, voice input functionality, data persistence, and a beautiful Material Design 3 interface with light/dark theme support.

## 🚀 Features

### Core Functionality
- ✅ **Task Management**: Add, complete, delete, and edit tasks
- 💾 **Data Persistence**: Tasks persist between app launches using AsyncStorage
- 🎯 **Task Details**: Add titles, descriptions, and due dates to tasks
- 🔍 **Search & Filter**: Find tasks quickly with search and filtering options
- 📅 **Due Dates**: Set and track due dates with visual indicators for overdue tasks

### Advanced Features
- 🎤 **Voice Input**: Use the floating action button to add tasks via voice commands
- 🧠 **Smart Task Parsing**: Automatically splits natural language into multiple tasks
  - Example: "Buy groceries and call mom" → creates 2 separate tasks
- 🌓 **Dark/Light Theme**: Toggle between themes with automatic persistence
- 📱 **Modern UI**: Material Design 3 components with smooth animations
- 🔧 **TypeScript**: Full type safety and enhanced development experience

### Navigation
- 📋 **Task List Screen**: Main screen showing all tasks with filters and search
- ➕ **Add Task Screen**: Dedicated screen for creating new tasks with form validation

## 🛠️ Technology Stack

- **Framework**: React Native 0.82.1
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **UI Library**: React Native Paper (Material Design 3)
- **State Management**: React Context API
- **Data Storage**: AsyncStorage
- **Voice Recognition**: @react-native-voice/voice
- **Icons**: React Native Vector Icons
- **Date Picker**: @react-native-community/datetimepicker

## 🔧 Installation & Setup

### Prerequisites

Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.

### Clone and Install

```bash
# Install dependencies
npm install

# For iOS (if targeting iOS)
cd ios && pod install && cd ..
```

### Android Setup

1. **Vector Icons Setup**: 
   ```bash
   # The vector icons should work out of the box for Android
   # If you encounter issues, follow the setup guide:
   # https://github.com/oblador/react-native-vector-icons#android
   ```

2. **Voice Recognition Permissions**:
   The app automatically requests microphone permissions on Android.

### iOS Setup

1. **Vector Icons Setup**:
   ```bash
   cd ios && pod install && cd ..
   ```

2. **Permissions**: Add the following to `ios/TodoListApp/Info.plist`:
   ```xml
   <key>NSMicrophoneUsageDescription</key>
   <string>This app uses the microphone to record voice commands for adding tasks.</string>
   <key>NSSpeechRecognitionUsageDescription</key>
   <string>This app uses speech recognition to convert voice commands into tasks.</string>
   ```

## 🚀 Running the App

### Start Metro Server

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

## 📖 Usage Guide

### Adding Tasks

1. **Manual Entry**: Tap the "+" floating action button to open the Add Task screen
2. **Voice Input**: Tap the microphone button and speak your task(s)
   - Single task: "Buy milk"
   - Multiple tasks: "Buy milk and call dentist and pay bills"

### Managing Tasks

- **Complete Task**: Tap the checkbox next to a task
- **Delete Task**: Tap the delete icon (with confirmation)
- **Search Tasks**: Use the search bar to find specific tasks
- **Filter Tasks**: Filter by All, Pending, or Completed
- **Sort Tasks**: Sort by Created Date, Due Date, or Title

### Voice Input Examples

The app intelligently parses natural language:

```
Input: "Buy groceries and call mom and pay electricity bill"
Output: 3 separate tasks:
- Buy groceries
- Call mom  
- Pay electricity bill
```

### Theme Switching

Tap the theme toggle icon in the top-right corner of the Task List screen to switch between light and dark themes.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TaskItem.tsx    # Individual task component
│   ├── TaskFilters.tsx # Search and filter component
│   └── VoiceFAB.tsx    # Voice input floating action button
├── context/            # React context providers
│   ├── TaskContext.tsx # Task management state
│   └── ThemeContext.tsx# Theme management state
├── hooks/              # Custom React hooks
│   └── useVoiceInput.ts# Voice input functionality
├── screens/            # Screen components
│   ├── TaskListScreen.tsx # Main task list screen
│   └── AddTaskScreen.tsx  # Add/edit task screen
├── services/           # Business logic and API services
│   ├── StorageService.ts  # AsyncStorage operations
│   └── VoiceService.ts    # Voice recognition logic
└── types/              # TypeScript type definitions
    └── index.ts        # App-wide type definitions
```

## 🔒 Permissions

The app requires the following permissions:

- **Android**: `RECORD_AUDIO` - For voice input functionality
- **iOS**: `NSMicrophoneUsageDescription` & `NSSpeechRecognitionUsageDescription`

Permissions are requested automatically when the voice input feature is first used.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🐛 Troubleshooting

### Common Issues

1. **Voice Recognition Not Working**:
   - Ensure microphone permissions are granted
   - Check device audio settings
   - Test on a physical device (emulator voice recognition may be limited)

2. **Metro Bundler Issues**:
   ```bash
   npm start -- --reset-cache
   ```

3. **Android Build Issues**:
   ```bash
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

4. **iOS Build Issues**:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

### Voice Input Troubleshooting

- Ensure you're testing on a physical device
- Check that the device has internet connection (for voice processing)
- Speak clearly and avoid background noise
- Try restarting the app if voice recognition becomes unresponsive

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📝 Development Notes

### Code Quality
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Component and function documentation with JSDoc
- Proper error handling and user feedback

### Performance Considerations
- Efficient list rendering with FlatList
- Optimized re-renders with React.memo where appropriate
- Lazy loading of non-critical components
- Proper cleanup of voice recognition resources

### Accessibility
- Semantic labels for screen readers
- Proper focus management
- High contrast theme support
- Keyboard navigation support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- React Native community for excellent documentation
- Material Design team for design guidelines
- Contributors to open source libraries used in this project

---

**Developer Exercise Completed**: ✅ All required features implemented including task management, navigation, data persistence, voice input with FAB, and bonus features like dark/light theme, search/filter, due dates, and modern UI with animations.
