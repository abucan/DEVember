import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold,
} from '@expo-google-fonts/amatic-sc';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// This is loaded first, so we can use it to load fonts
export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Inter: Inter_900Black,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
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
    <Stack screenOptions={{}}>
      <Stack.Screen
        name='index'
        options={{
          title: 'DEVember of React Native',
        }}
      />
    </Stack>
  );
}
