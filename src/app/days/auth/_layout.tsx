import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { AuthUser, getCurrentUser } from 'aws-amplify/auth';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';

export default function AuthLayout() {
  return <Slot />;
}
