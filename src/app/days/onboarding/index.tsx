import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

const OnboardingScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Onboarding' }} />
      <Text style={{ fontFamily: 'AmaticBold', fontSize: 50 }}>
        Onboarding Screen
      </Text>
    </View>
  );
};

export default OnboardingScreen;
