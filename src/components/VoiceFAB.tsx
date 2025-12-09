import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, useTheme as usePaperTheme } from 'react-native-paper';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface VoiceFABProps {
  onAddTaskPress: () => void;
}

/**
 * Floating Action Button with voice input capability
 */
export const VoiceFAB: React.FC<VoiceFABProps> = ({ onAddTaskPress }) => {
  const theme = usePaperTheme();
  const { isListening, startVoiceInput, stopVoiceInput } = useVoiceInput();

  const handleFABPress = async (): Promise<void> => {
    if (isListening) {
      await stopVoiceInput();
    } else {
      await startVoiceInput();
    }
  };

  return (
    <View style={styles.fabContainer}>
      {/* Voice Input FAB */}
      <FAB
        icon={isListening ? 'microphone' : 'microphone-outline'}
        size="medium"
        style={[
          styles.voiceFab,
          {
            backgroundColor: isListening ? theme.colors.error : theme.colors.secondary,
          },
          isListening && styles.listeningFab,
        ]}
        onPress={handleFABPress}
        label={isListening ? '🎤 Listening...' : '🎤 Voice'}
        mode="flat"
        variant="primary"
        animated={true}
        loading={isListening}
      />
      
      {/* Regular Add Task FAB */}
      <FAB
        icon="plus"
        size="large"
        style={[styles.addFab, { backgroundColor: theme.colors.primary }]}
        onPress={onAddTaskPress}
        mode="flat"
        animated={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    alignItems: 'flex-end',
  },
  voiceFab: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  listeningFab: {
    elevation: 8,
    transform: [{ scale: 1.1 }],
  },
  addFab: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5.84,
    elevation: 10,
  },
});
