import { Stack, router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import Animated, {
  BounceOutRight,
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';

const onboardingSteps = [
  {
    title: 'Track every transaction',
    description:
      'Over 110 million people and businesses trust us to buy, sell, and manage crypto.',
    image: 'people-arrows',
  },
  {
    title: 'Explore crypto like Bitcoin',
    description:
      'Simply and securely buy, sell, and manage hundreds of cryptocurrencies.',
    image: 'bitcoin',
  },
  {
    title: 'Earn crypto rewards',
    description:
      'Your daily coffee and weekly grocery run can now earn you up to 4% back in a crypto reward of your choice when you use Coinbase Card.',
    image: 'credit-card',
  },
];

const OnboardingScreen = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    if (screenIndex === onboardingSteps.length - 1) endOnboarding();
    setScreenIndex((prev) => prev + 1);
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex((prev) => prev - 1);
    }
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
  );

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StatusBar style='light' />
      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              {
                backgroundColor:
                  index === screenIndex ? '#CEF202' : 'gray',
              },
            ]}
          />
        ))}
      </View>
      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={screenIndex}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <FontAwesome5
              style={styles.image}
              name={data.image}
              size={100}
              color='#CEF202'
            />
          </Animated.View>
          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(100)}
              exiting={SlideOutLeft}
              style={styles.description}
            >
              {data.description}
            </Animated.Text>

            <View style={styles.buttonsRow}>
              <Text style={styles.buttonText}>Skip</Text>
              <Pressable style={styles.button} onPress={onContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#15141A',
    padding: 20,
  },
  image: {
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    color: '#FDFDFD',
    fontSize: 50,
    fontFamily: 'InterBlack',
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: 'gray',
    fontSize: 20,
    fontFamily: 'Inter',
    lineHeight: 25,
  },
  footer: {
    marginTop: 'auto',
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  buttonsRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#302E38',
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#FDFDFD',
    fontFamily: 'InterMedium',
    fontSize: 20,
    padding: 15,
    paddingHorizontal: 25,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    gap: 2,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
});

export default OnboardingScreen;
