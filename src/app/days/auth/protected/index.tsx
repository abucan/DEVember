import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

const ProtectedScreen = () => {
  const { signOut } = useAuthenticator();
  return (
    <View>
      <Text>ProtectedScreen</Text>
      <Button title='Sign Out' onPress={() => signOut()} />
    </View>
  );
};

export default ProtectedScreen;
