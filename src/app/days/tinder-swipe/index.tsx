import { View } from 'react-native';
import { TinderCard } from '../../../components/TinderCard';
import { Stack } from 'expo-router';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';

const dummuUsers = [
  {
    id: 1,
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg',
    name: 'Dani',
  },
  {
    id: 2,
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg',
    name: 'Jon',
  },
  {
    id: 3,
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg',
    name: 'Dani',
  },
  {
    id: 4,
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg',
    name: 'Alice',
  },
  {
    id: 5,
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg',
    name: 'Dani',
  },
  {
    id: 6,
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/6.jpg',
    name: 'Kelsey',
  },
];

const TinderScreen = () => {
  const [users, setUsers] = useState(dummuUsers);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  useEffect(() => {
    if (index > users.length - 3) {
      console.warn('Last 2 cards remining. Fetch more!');
      setUsers((usrs) => [...usrs, ...dummuUsers.reverse()]);
    }
  }, [index]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />
      {dummuUsers.map((user, index) => (
        <TinderCard
          key={`${user.id}-${index}`}
          user={user}
          numOfCards={users.length}
          currIndex={index}
          activeIndex={activeIndex}
        />
      ))}
    </View>
  );
};

export default TinderScreen;
