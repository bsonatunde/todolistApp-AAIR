import { useState, useCallback } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { VoiceService } from '../services/VoiceService';
import { useTask } from '../context/TaskContext';
import Voice from '@react-native-voice/voice';

/**
 * Custom hook for voice input functionality
 */
export const useVoiceInput = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceText, setVoiceText] = useState<string>('');
  const { addTask } = useTask();

  /**
   * Request microphone permission (Android)
   */
  const requestMicrophonePermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone to use voice input.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  /**
   * Process voice input and create tasks
   */
  const handleVoiceInput = useCallback((text: string): void => {
    if (!text || text.trim().length === 0) {
      return;
    }

    // Extract individual tasks from the spoken text
    const taskTitles = VoiceService.extractTasks(text);
    
    if (taskTitles.length === 0) {
      Alert.alert('🎤 No Tasks Found', 'Could not extract any tasks from the voice input. Try speaking more clearly or use phrases like "Buy milk and call mom"');
      return;
    }

    // Add each extracted task
    taskTitles.forEach(title => {
      addTask(title);
    });

    // Show confirmation
    const taskCount = taskTitles.length;
    const message = taskCount === 1 
      ? `✅ Added task: "${taskTitles[0]}"` 
      : `🎉 Added ${taskCount} tasks:\n${taskTitles.map(task => `• ${task}`).join('\n')}`;
    
    Alert.alert('🎤 Tasks Added Successfully!', message);
    setVoiceText('');
  }, [addTask]);

  /**
   * Initialize voice input
   */
  const initializeVoice = useCallback(async (): Promise<void> => {
    try {
      await VoiceService.initialize();
      
      // Set up voice event handlers with better error handling
      Voice.onSpeechStart = () => {
        console.log('🎤 Speech recognition started');
      };

      Voice.onSpeechEnd = () => {
        console.log('🎤 Speech recognition ended');
        setIsListening(false);
      };

      Voice.onSpeechError = (error: any) => {
        console.error('🎤 Speech error:', error);
        setIsListening(false);
        
        // Handle different error types gracefully
        let errorMessage = '❌ Failed to recognize speech. Please try again and speak clearly.';
        
        if (error?.error?.code) {
          const errorCode = String(error.error.code);
          const errorMessages: Record<string, string> = {
            '1': '⏱️ Network timeout - Please check your connection',
            '2': '🌐 Network error - Please check your internet connection', 
            '3': '🎤 Microphone error - Please check microphone permissions',
            '4': '🔧 Server error - Please try again later',
            '5': '📱 Client error - Please restart the app',
            '6': '⏱️ Speech timeout - Please speak more clearly',
            '7': '🤷 No speech detected - Please try speaking again',
            '8': '⏳ Recognition service busy - Please wait and try again',
            '9': '🔒 Insufficient permissions - Please enable microphone access'
          };
          
          errorMessage = errorMessages[errorCode] || errorMessage;
        }
        
        // Only show alert if the error is significant (not just timeout/no speech)
        if (!error?.error?.code || !['6', '7'].includes(String(error.error.code))) {
          Alert.alert('🎤 Voice Recognition Error', errorMessage);
        }
      };

      Voice.onSpeechResults = (event: any) => {
        console.log('🎤 Speech results received:', event);
        if (event?.value && Array.isArray(event.value) && event.value.length > 0) {
          const recognizedText = event.value[0];
          console.log('🎤 Recognized text:', recognizedText);
          setVoiceText(recognizedText);
          handleVoiceInput(recognizedText);
        }
      };

      Voice.onSpeechPartialResults = (event: any) => {
        // Show partial results for better user feedback
        if (event?.value && Array.isArray(event.value) && event.value.length > 0) {
          const partialText = event.value[0];
          console.log('🎤 Partial text:', partialText);
          setVoiceText(partialText);
        }
      };
      
    } catch (error) {
      console.error('Voice initialization failed:', error);
      throw new Error(`Failed to initialize voice recognition: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [handleVoiceInput]);

  /**
   * Start voice recording
   */
  const startVoiceInput = useCallback(async (): Promise<void> => {
    try {
      // Prevent multiple concurrent starts
      if (isListening) {
        console.log('Voice input already active');
        return;
      }

      // Check permissions first
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          '🎤 Permission Required', 
          'Microphone permission is required for voice input. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => console.log('Open settings') }
          ]
        );
        return;
      }

      // Check if voice is available
      const isAvailable = await VoiceService.isAvailable();
      if (!isAvailable) {
        Alert.alert(
          '🎤 Voice Unavailable', 
          'Voice recognition is not available on this device. This might be due to:\n\n• No speech recognition service installed\n• Device not supported\n• Network connectivity issues'
        );
        return;
      }

      // Initialize voice service
      await initializeVoice();

      // Set listening state before starting
      setIsListening(true);
      setVoiceText('');
      
      // Start voice recognition
      await VoiceService.startListening();
      
      // Show user feedback
      console.log('🎤 Voice input started - speak now!');
      
    } catch (error) {
      console.error('Failed to start voice input:', error);
      setIsListening(false);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert(
        '🎤 Voice Recognition Error', 
        `❌ ${errorMessage}\n\n💡 Please try:\n• Speaking closer to the microphone\n• Checking your internet connection\n• Restarting the app`
      );
    }
  }, [isListening, initializeVoice]);

  /**
   * Stop voice recording
   */
  const stopVoiceInput = useCallback(async (): Promise<void> => {
    try {
      setIsListening(false);
      await VoiceService.stopListening();
    } catch (error) {
      console.error('Failed to stop voice input:', error);
    }
  }, []);

  /**
   * Cleanup voice resources
   */
  const cleanup = useCallback(async (): Promise<void> => {
    try {
      await VoiceService.cleanup();
    } catch (error) {
      console.error('Failed to cleanup voice:', error);
    }
  }, []);

  return {
    isListening,
    voiceText,
    startVoiceInput,
    stopVoiceInput,
    cleanup,
  };
};
