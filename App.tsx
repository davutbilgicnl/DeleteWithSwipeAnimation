import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SwipeDeleteAnimation from './components/SwipeDeleteAnimation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SwipeDeleteAnimation />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
