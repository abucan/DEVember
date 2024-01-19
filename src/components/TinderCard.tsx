import { LinearGradient } from 'expo-linear-gradient';
import { View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
export const tinderCardWidth = screenWidth * 0.8;

type TinderCard = {
  user: {
    id: number;
    image: string;
    name: string;
  };
  numOfCards: number;
  currIndex: number;
  activeIndex: SharedValue<number>;
};

export const TinderCard = ({
  user,
  numOfCards,
  currIndex,
  activeIndex,
}: TinderCard) => {
  const translationX = useSharedValue(0);
  const gesture = Gesture.Pan()
    .onChange((event) => {
      translationX.value = event.translationX;

      activeIndex.value = interpolate(
        Math.abs(translationX.value),
        [0, 500],
        [currIndex, currIndex + 0.8]
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 400) {
        translationX.value = withSpring(Math.sign(event.velocityX) * 600, {
          velocity: event.velocityX,
        });
        activeIndex.value = withSpring(currIndex + 1);

        // runOnJS(onResponse)(event.velocityX > 0);
      } else {
        translationX.value = withSpring(0);
      }
    });

  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [currIndex - 1, currIndex, currIndex + 1],
      [1 - 1 / 5, 1, 1]
    ),
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [currIndex - 1, currIndex, currIndex + 1],
          [0.95, 1, 1]
        ),
      },
      {
        translateY: interpolate(
          activeIndex.value,
          [currIndex - 1, currIndex, currIndex + 1],
          [-30, 0, 0]
        ),
      },
      {
        translateX: translationX.value,
      },
      {
        rotateZ: `${interpolate(
          translationX.value,
          [-screenWidth / 2, 0, screenWidth / 2],
          [-15, 0, 15]
        )}deg`,
      },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.card,
          animatedCard,
          {
            zIndex: numOfCards - currIndex,
          },
        ]}
      >
        <Image
          source={{ uri: user.image }}
          style={[StyleSheet.absoluteFillObject, styles.image]}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        <View style={styles.footer}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: tinderCardWidth,
    height: tinderCardWidth * 1.67,
    borderRadius: 15,

    justifyContent: 'flex-end',
    position: 'absolute',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    borderRadius: 15,
  },
  footer: {
    padding: 10,
  },
  name: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'InterBold',
  },
  overlay: {
    top: '50%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
