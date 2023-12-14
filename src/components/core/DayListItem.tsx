import { Link } from 'expo-router';
import { Text, StyleSheet, Pressable } from 'react-native';

type DayListItemProps = {
  day: number;
  screen: string;
};

const DayListItem = ({ day, screen }: DayListItemProps) => {
  return (
    <Link href={`/days/${screen}`} asChild>
      <Pressable style={styles.box}>
        <Text style={styles.text}>{day}</Text>
      </Pressable>
    </Link>
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
    fontFamily: 'Amatic',
  },
});

export default DayListItem;
