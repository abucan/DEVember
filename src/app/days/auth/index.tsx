import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Auth = () => {
  return (
    <View>
      <Link href='/days/auth/protected'>Home</Link>
      <Link href='/days/auth/authentication/sign-in'>Sign in</Link>
      <Text>Auth</Text>
    </View>
  );
};

export default Auth;
