/**
 * Icon Testing Utility
 * Use this file to test and validate all icons in the application
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Surface, Card, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { APP_ICONS, getSafeIconName, validateIcon } from './iconUtils';

interface IconTestItemProps {
  iconKey: string;
  iconName: string;
}

const IconTestItem: React.FC<IconTestItemProps> = ({ iconKey, iconName }) => {
  const isValid = validateIcon(iconName);
  
  return (
    <Surface style={styles.iconItem}>
      <View style={styles.iconContainer}>
        <Icon 
          name={getSafeIconName(iconName)} 
          size={24} 
          color={isValid ? '#4CAF50' : '#F44336'} 
        />
        <Text style={styles.iconLabel}>{iconKey}</Text>
        <Chip 
          mode="outlined" 
          style={[styles.statusChip, isValid ? styles.validChip : styles.invalidChip]}
          textStyle={styles.chipText}
        >
          {isValid ? '✓ Valid' : '✗ Invalid'}
        </Chip>
      </View>
    </Surface>
  );
};

/**
 * Icon Test Component - Use this to verify all icons are working
 */
export const IconTestScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text style={styles.header}>🎨 Icon Test Suite</Text>
          <Text style={styles.description}>
            This screen tests all icons used in the application to ensure they're properly loaded.
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.testCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Task Status Icons</Text>
          <View style={styles.iconGrid}>
            <IconTestItem iconKey="TASK_COMPLETED" iconName={APP_ICONS.TASK_COMPLETED} />
            <IconTestItem iconKey="TASK_PENDING" iconName={APP_ICONS.TASK_PENDING} />
            <IconTestItem iconKey="TASK_OVERDUE" iconName={APP_ICONS.TASK_OVERDUE} />
            <IconTestItem iconKey="TASK_DUE_TODAY" iconName={APP_ICONS.TASK_DUE_TODAY} />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.testCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Action Icons</Text>
          <View style={styles.iconGrid}>
            <IconTestItem iconKey="ADD" iconName={APP_ICONS.ADD} />
            <IconTestItem iconKey="DELETE" iconName={APP_ICONS.DELETE} />
            <IconTestItem iconKey="EDIT" iconName={APP_ICONS.EDIT} />
            <IconTestItem iconKey="SAVE" iconName={APP_ICONS.SAVE} />
            <IconTestItem iconKey="CANCEL" iconName={APP_ICONS.CANCEL} />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.testCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Navigation Icons</Text>
          <View style={styles.iconGrid}>
            <IconTestItem iconKey="BACK" iconName={APP_ICONS.BACK} />
            <IconTestItem iconKey="FORWARD" iconName={APP_ICONS.FORWARD} />
            <IconTestItem iconKey="UP" iconName={APP_ICONS.UP} />
            <IconTestItem iconKey="DOWN" iconName={APP_ICONS.DOWN} />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.testCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Media Icons</Text>
          <View style={styles.iconGrid}>
            <IconTestItem iconKey="MICROPHONE" iconName={APP_ICONS.MICROPHONE} />
            <IconTestItem iconKey="MICROPHONE_OFF" iconName={APP_ICONS.MICROPHONE_OFF} />
            <IconTestItem iconKey="PLAY" iconName={APP_ICONS.PLAY} />
            <IconTestItem iconKey="PAUSE" iconName={APP_ICONS.PAUSE} />
            <IconTestItem iconKey="STOP" iconName={APP_ICONS.STOP} />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.testCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Interface Icons</Text>
          <View style={styles.iconGrid}>
            <IconTestItem iconKey="MENU" iconName={APP_ICONS.MENU} />
            <IconTestItem iconKey="SEARCH" iconName={APP_ICONS.SEARCH} />
            <IconTestItem iconKey="FILTER" iconName={APP_ICONS.FILTER} />
            <IconTestItem iconKey="SORT" iconName={APP_ICONS.SORT} />
            <IconTestItem iconKey="SETTINGS" iconName={APP_ICONS.SETTINGS} />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
  },
  testCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  iconItem: {
    padding: 12,
    borderRadius: 8,
    minWidth: '45%',
    margin: 4,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginVertical: 4,
    textAlign: 'center',
  },
  statusChip: {
    marginTop: 4,
  },
  validChip: {
    backgroundColor: '#E8F5E8',
  },
  invalidChip: {
    backgroundColor: '#FFEBEE',
  },
  chipText: {
    fontSize: 10,
  },
});

export default IconTestScreen;
