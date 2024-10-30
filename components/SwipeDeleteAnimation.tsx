import { useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import ListItem from './ListItem';

const TITLES = [
  '🚀 Duty of Care to the People We Serve',
  '⭐️ Respect for All Individuals',
  '🚀 Integrity in Everything We Do',
  '⭐️ Transparency in Our Actions',
  '🚀 Compliance with Laws and Regulations',
  '⭐️ Accountability for Our Actions',
  '🚀 Commitment to Quality',
  '⭐️ Innovation Across Our Business',
  '🚀 Safety in All Aspects of Our Work',
  '⭐️ Environmental Responsibility',
  '🚀 Customer Satisfaction',
  '⭐️ Teamwork and Collaboration',
  '🚀 Continuous Improvement',
  '⭐️ Diversity and Inclusion',
  '🚀 Community Impact',
];

export interface ITask {
  title: string;
  index: number;
}

const TASKS: ITask[] = TITLES.map((title, index) => ({ title, index }));

const BACKGROUND_COLOR = 'lightblue';

const SwipeDeleteAnimation: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>(TASKS);

  const scrollRef = useRef(null);

  const onTaskDismissed = (task: ITask) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.index !== task.index));
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Core Values</Text>
      <ScrollView scrollEnabled={true} ref={scrollRef}>
        {tasks.map((task) => (
          <ListItem
            key={task.index}
            task={task}
            onDismiss={onTaskDismissed}
            simultaneousHandlers={scrollRef}
          />
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default SwipeDeleteAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingLeft: '5%',
  },
});
