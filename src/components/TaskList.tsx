import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SectionList,
  // FlatList,
} from 'react-native';
import {TaskItems} from '../types/types';
import {createListData} from '../utils/utils';

interface TaskListProps {
  tasks: TaskItems[];
  onDeleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({tasks, onDeleteTask}) => {
  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => <Text style={styles.sectionHeader}>{title}</Text>;

  const renderTaskItem = ({item, index}: {item: TaskItems; index: number}) => {
    return (
      <View style={styles.taskItem}>
        <View style={styles.itemConatiner}>
          <Text style={styles.textStyle}>{item.taskName}</Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButtonContainer}
          onPress={() => onDeleteTask(item.id)}>
          <Text style={styles.deleteButton}>{'Delete'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listHeader}>{'List of Tasks'}</Text>

      <SectionList
        sections={createListData(tasks)}
        renderItem={renderTaskItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />

      {/* <FlatList
        data={tasks}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.taskItem}>
            <View style={styles.itemConatiner}>
              <Text style={styles.textStyle}>{item.text}</Text>
            </View>

            <TouchableOpacity
              style={styles.deleteButtonContainer}
              onPress={() => onDeleteTask(item.id)}>
              <Text style={styles.deleteButton}>{'Delete'}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: '#F7F4F4',
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    paddingBottom: 10,
  },
  taskItem: {
    minHeight: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemConatiner: {
    flex: 8,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  deleteButtonContainer: {
    flex: 2,
    alignItems: 'center',
  },
  deleteButton: {
    color: 'red',
  },
  sectionHeader: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
});

export default TaskList;
