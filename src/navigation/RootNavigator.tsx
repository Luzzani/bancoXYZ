import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../features/auth/LoginScreen';
import { HomeScreen } from '../features/home/HomeScreen';
import { TransferFormScreen } from '../features/transfer/TransferFormScreen';
import { TransferListScreen } from '../features/transfer/TransferListScreen';
import { RootStackParamList } from './types';
import { useAuthInitialization } from '../hooks/useAuthInitialization';
import { ErrorView } from '../components/common/ErrorView';
import { LoadingView } from '../components/common/LoadingView';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, isInitializing, storageError } = useAuthInitialization();

  if (storageError) {
    return <ErrorView message={storageError} />;
  }

  if (isInitializing) {
    return <LoadingView />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TransferForm" component={TransferFormScreen} />
          <Stack.Screen name="TransferList" component={TransferListScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
