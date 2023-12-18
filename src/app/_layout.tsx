import { Stack } from 'expo-router';
import { useEffect } from 'react';
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

SplashScreen.preventAutoHideAsync();

// This is loaded first, so we can use it to load fonts
export default function RootLayout() {
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
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{}}>
        <Stack.Screen
          name='index'
          options={{
            title: 'DEVember of React Native',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
