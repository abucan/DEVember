import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { router } from 'expo-router';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSignInPress = async () => {
    setError('');
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });
      if (isSignedIn) {
        router.push('/days/auth/protected');
      }
    } catch (error: any) {
      console.log('error signing in', error);
      setError(error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder='ante@email.com'
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title='Sign In' onPress={onSignInPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontFamily: 'InterMedium',
    fontSize: 24,
    color: 'dimgray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default SignInScreen;
