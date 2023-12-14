import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { days } from '../../days';
import DayListItem from '../components/core/DayListItem';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.column}
        numColumns={2}
        data={days}
        renderItem={({ item }) => {
          return <DayListItem day={item.day} screen={item.screen} />;
        }}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    gap: 10,
  },
  column: {
    gap: 10,
    padding: 10,
  },
});
