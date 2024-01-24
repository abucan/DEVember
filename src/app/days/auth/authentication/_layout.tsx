import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Redirect, Slot } from 'expo-router';

export default function AuthLayout() {
  const { authStatus } = useAuthenticator((context) => [
    context.authStatus,
  ]);

  if (authStatus !== 'unauthenticated') {
    return <Redirect href={'/days/auth/protected'} />;
  }
  return <Slot />;
}
