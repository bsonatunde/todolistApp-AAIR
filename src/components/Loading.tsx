import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme as usePaperTheme } from 'react-native-paper';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
}

/**
 * Professional loading component with customizable message and size
 */
export const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading...', 
  size = 'large' 
}) => {
  const theme = usePaperTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <ActivityIndicator 
          size={size} 
          color={theme.colors.primary}
          style={styles.indicator}
        />
        <Text 
          variant="bodyLarge" 
          style={[styles.message, { color: theme.colors.onSurface }]}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  indicator: {
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
  },
});
