import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Chip, Surface } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: 'all' | 'pending' | 'completed';
  onFilterChange: (status: 'all' | 'pending' | 'completed') => void;
  sortBy: 'created' | 'due' | 'title';
  onSortChange: (sortBy: 'created' | 'due' | 'title') => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <LinearGradient
      colors={['#f8f9fa', '#e9ecef']}
      style={styles.container}>
      <Surface style={styles.surface} elevation={2}>
        {/* Search Bar */}
        <Searchbar
          placeholder="Search tasks..."
          onChangeText={onSearchChange}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#6c757d"
          inputStyle={styles.searchInput}
        />

        {/* Filter Chips */}
        <View style={styles.chipContainer}>
          <View style={styles.chipRow}>
            <Chip
              selected={filterStatus === 'all'}
              onPress={() => onFilterChange('all')}
              style={[styles.chip, filterStatus === 'all' && styles.selectedChip]}
              textStyle={filterStatus === 'all' ? styles.selectedChipText : styles.chipText}>
              📋 All Tasks
            </Chip>

            <Chip
              selected={filterStatus === 'pending'}
              onPress={() => onFilterChange('pending')}
              style={[styles.chip, filterStatus === 'pending' && styles.selectedChip]}
              textStyle={filterStatus === 'pending' ? styles.selectedChipText : styles.chipText}>
              ⏰ Pending
            </Chip>

            <Chip
              selected={filterStatus === 'completed'}
              onPress={() => onFilterChange('completed')}
              style={[styles.chip, filterStatus === 'completed' && styles.selectedChip]}
              textStyle={filterStatus === 'completed' ? styles.selectedChipText : styles.chipText}>
              ✅ Completed
            </Chip>
          </View>

          {/* Sort Chips */}
          <View style={styles.chipRow}>
            <Chip
              selected={sortBy === 'created'}
              onPress={() => onSortChange('created')}
              style={[styles.chip, sortBy === 'created' && styles.selectedSortChip]}
              textStyle={sortBy === 'created' ? styles.selectedChipText : styles.chipText}>
              📅 Created Date
            </Chip>

            <Chip
              selected={sortBy === 'due'}
              onPress={() => onSortChange('due')}
              style={[styles.chip, sortBy === 'due' && styles.selectedSortChip]}
              textStyle={sortBy === 'due' ? styles.selectedChipText : styles.chipText}>
              ⏰ Due Date
            </Chip>

            <Chip
              selected={sortBy === 'title'}
              onPress={() => onSortChange('title')}
              style={[styles.chip, sortBy === 'title' && styles.selectedSortChip]}
              textStyle={sortBy === 'title' ? styles.selectedChipText : styles.chipText}>
              🔤 Title
            </Chip>
          </View>
        </View>
      </Surface>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  surface: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    elevation: 0,
  },
  searchInput: {
    fontSize: 16,
    color: '#495057',
  },
  chipContainer: {
    gap: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  selectedChip: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  selectedSortChip: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  chipText: {
    color: '#6c757d',
    fontSize: 12,
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TaskFilters;
