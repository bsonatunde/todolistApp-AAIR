import Voice from '@react-native-voice/voice';

/**
 * Service for handling voice recognition and natural language processing
 */
export class VoiceService {
  private static isListening = false;

  /**
   * Initialize voice recognition service
   */
  static async initialize(): Promise<void> {
    try {
      // Clean up any existing listeners first
      Voice.removeAllListeners();
      
      // Check if voice recognition is supported
      const isSupported = await Voice.isAvailable();
      if (!isSupported) {
        throw new Error('Voice recognition is not supported on this device');
      }
      
      // Set up event handlers
      Voice.onSpeechStart = VoiceService.onSpeechStart;
      Voice.onSpeechEnd = VoiceService.onSpeechEnd;
      Voice.onSpeechError = VoiceService.onSpeechError;
      Voice.onSpeechResults = VoiceService.onSpeechResults;
      Voice.onSpeechPartialResults = VoiceService.onSpeechPartialResults;
      
      console.log('Voice service initialized successfully');
    } catch (error) {
      console.error('Voice initialization error:', error);
      throw new Error(`Failed to initialize voice recognition: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Start voice recognition
   */
  static async startListening(): Promise<void> {
    try {
      if (VoiceService.isListening) {
        console.log('Voice is already listening, stopping first...');
        await VoiceService.stopListening();
        // Add a small delay to ensure cleanup
        await new Promise<void>(resolve => setTimeout(resolve, 100));
      }
      
      console.log('Starting voice recognition...');
      await Voice.start('en-US');
      VoiceService.isListening = true;
      console.log('Voice recognition started successfully');
    } catch (error) {
      console.error('Voice start error:', error);
      VoiceService.isListening = false;
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('permissions')) {
          throw new Error('🎤 Microphone permission is required for voice input');
        } else if (error.message.includes('busy')) {
          throw new Error('🎤 Voice recognition is busy. Please wait and try again');
        } else if (error.message.includes('network')) {
          throw new Error('🎤 Network error. Please check your connection and try again');
        }
      }
      
      throw new Error('🎤 Failed to start voice recognition. Please try again');
    }
  }

  /**
   * Stop voice recognition
   */
  static async stopListening(): Promise<void> {
    try {
      await Voice.stop();
      VoiceService.isListening = false;
    } catch (error) {
      console.error('Voice stop error:', error);
    }
  }

  /**
   * Check if voice recognition is available
   */
  static async isAvailable(): Promise<boolean> {
    try {
      // First check if the Voice service is ready
      const available = await Voice.isAvailable();
      console.log('Voice.isAvailable() result:', available);
      
      // Handle different return types from isAvailable
      // The API may return number (1/0) or boolean (true/false)
      if (available === 1 || (typeof available === 'boolean' && available === true)) {
        return true;
      }
      
      if (available === 0 || (typeof available === 'boolean' && available === false)) {
        return false;
      }
      
      // On Android, sometimes isAvailable returns null/undefined but voice still works
      // So we also check if we can get recognition service info
      if (available === null || available === undefined) {
        try {
          await Voice.getSpeechRecognitionServices();
          console.log('Speech recognition services found via fallback check');
          return true;
        } catch (serviceError) {
          console.log('Speech recognition services not available:', serviceError);
          return false;
        }
      }
      
      // If we get here, assume it's available and let it fail gracefully if not
      return Boolean(available);
    } catch (error) {
      console.error('Voice availability check error:', error);
      // Return false to be safe - better to show a clear error than crash
      return false;
    }
  }

  /**
   * Process natural language text and extract individual tasks
   * Handles phrases like "Buy groceries and call mom" -> ["Buy groceries", "Call mom"]
   * @param text The spoken text to process
   * @returns Array of individual task titles
   */
  static extractTasks(text: string): string[] {
    if (!text || text.trim().length === 0) {
      return [];
    }

    // Clean up the text
    const cleanText = text.trim().toLowerCase();
    
    // Common separators and conjunctions
    const separators = [
      ' and then ',
      ' and ',
      ' then ',
      ' also ',
      ' plus ',
      ' & ',
      ', and then ',
      ', and ',
      ', then ',
      ', also ',
    ];

    // Split by common separators
    let tasks = [cleanText];
    
    separators.forEach(separator => {
      const newTasks: string[] = [];
      tasks.forEach(task => {
        if (task.includes(separator)) {
          newTasks.push(...task.split(separator));
        } else {
          newTasks.push(task);
        }
      });
      tasks = newTasks;
    });

    // Clean up individual tasks
    return tasks
      .map(task => task.trim())
      .filter(task => task.length > 0)
      .map(task => {
        // Remove common prefixes
        const prefixes = ['i need to ', 'i have to ', 'i should ', 'need to ', 'have to ', 'should '];
        let cleanTask = task;
        prefixes.forEach(prefix => {
          if (cleanTask.startsWith(prefix)) {
            cleanTask = cleanTask.substring(prefix.length);
          }
        });
        
        // Remove trailing punctuation (commas, periods, etc.)
        cleanTask = cleanTask.replace(/[.,;!?]+$/, '');
        
        // Capitalize first letter
        return cleanTask.charAt(0).toUpperCase() + cleanTask.slice(1);
      })
      .filter(task => task.length > 1); // Filter out single character tasks
  }

  private static onSpeechStart = () => {
    console.log('Voice recognition started');
  };

  private static onSpeechEnd = () => {
    console.log('Voice recognition ended');
    VoiceService.isListening = false;
  };

  private static onSpeechError = (error: any) => {
    console.error('Voice recognition error:', error);
    VoiceService.isListening = false;
    
    // Log more specific error information
    if (error?.error) {
      console.error('Error details:', {
        code: error.error.code,
        message: error.error.message,
        type: typeof error.error
      });
      
      // Common error codes and their meanings
      const errorMessages: Record<string, string> = {
        '1': 'Network timeout',
        '2': 'Network error', 
        '3': 'Audio recording error',
        '4': 'Server error',
        '5': 'Client error',
        '6': 'Speech timeout',
        '7': 'No match found',
        '8': 'Recognition service busy',
        '9': 'Insufficient permissions'
      };
      
      const errorCode = String(error.error.code);
      if (errorMessages[errorCode]) {
        console.error(`Voice error (${errorCode}):`, errorMessages[errorCode]);
      }
    }
  };

  private static onSpeechResults = (result: any) => {
    console.log('Voice recognition results:', result);
    // Results are typically in result.value array
    if (result?.value && Array.isArray(result.value) && result.value.length > 0) {
      const recognizedText = result.value[0];
      console.log('Recognized text:', recognizedText);
    }
  };

  private static onSpeechPartialResults = (result: any) => {
    console.log('Voice recognition partial results:', result);
    // Partial results can be used for real-time feedback
    if (result?.value && Array.isArray(result.value) && result.value.length > 0) {
      const partialText = result.value[0];
      console.log('Partial text:', partialText);
    }
  };

  /**
   * Cleanup voice service resources
   */
  static async cleanup(): Promise<void> {
    try {
      await Voice.destroy();
      Voice.removeAllListeners();
    } catch (error) {
      console.error('Voice cleanup error:', error);
    }
  }
}
