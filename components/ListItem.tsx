import { Dimensions, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { FontAwesome } from '@expo/vector-icons';
import { ITask } from './SwipeDeleteAnimation';

interface IListItem {
  task: ITask;
  onDismiss?: (task: ITask) => void;
  simultaneousHandlers?: any;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const LIST_ITEM_HEIGHT = 70;
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem: React.FC<IListItem> = ({ task, onDismiss, simultaneousHandlers }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onStart(() => {})
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withSpring(0);
      }
    })
    .simultaneousWithExternalGesture(simultaneousHandlers);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const reanimatedIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
    return {
      opacity: opacity,
    };
  });

  const reanimatedTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const gesture = Gesture.Exclusive(panGesture);

  return (
    <Animated.View style={[styles.taskContainer, reanimatedTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, reanimatedIconContainerStyle]}>
        <FontAwesome name="trash" size={LIST_ITEM_HEIGHT * 0.4} color="tomato" />
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.task, reanimatedStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
  },
  task: {
    backgroundColor: 'white',
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 15,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Shadow for Android
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
