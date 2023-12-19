import { View } from 'react-native';
import { Stack } from 'expo-router';
import AnimatedSplashScreen from '../../../components/core/AnimatedSplashScreen';

const AnimationScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <AnimatedSplashScreen />
    </View>
  );
};

export default AnimationScreen;
