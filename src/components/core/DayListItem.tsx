import { View, Text, StyleSheet } from 'react-native';

type DayListItemProps = {
  day: number;
};

const DayListItem = ({ day }: DayListItemProps) => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{day}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F9EDE3',
    flex: 1,
    aspectRatio: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9b4521',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#9b4521',
    fontSize: 70,
  },
});

export default DayListItem;
