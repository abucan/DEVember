import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  useFonts,
  Inter_900Black,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_400Regular,
} from '@expo-google-fonts/inter';
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold,
} from '@expo-google-fonts/amatic-sc';
import { CourierPrime_400Regular } from '@expo-google-fonts/courier-prime';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedSplashScreen from '../components/core/AnimatedSplashScreen';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
import {
  Authenticator,
  ThemeProvider,
} from '@aws-amplify/ui-react-native';
Amplify.configure(amplifyconfig);

const theme = {
  tokens: {
    colors: {
      font: {
        primary: 'black',
      },
    },
  },
};

// SplashScreen.preventAutoHideAsync();

// This is loaded first, so we can use it to load fonts
export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] =
    useState(false);

  const [fontsLoaded, error] = useFonts({
    Inter: Inter_400Regular,
    InterMedium: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
    Courier: CourierPrime_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      // SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [fontsLoaded, error]);

  const showAnimatedSplash = !appReady || !splashAnimationFinished;
  if (showAnimatedSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) {
            setSplashAnimationFinished(true);
          }
        }}
      />
    );
  }
  return (
    <Authenticator.Provider>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Animated.View entering={FadeIn} style={{ flex: 1 }}>
            <Stack screenOptions={{}}>
              <Stack.Screen
                name='index'
                options={{
                  title: 'DEVember of React Native',
                }}
              />
            </Stack>
          </Animated.View>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Authenticator.Provider>
  );
}
