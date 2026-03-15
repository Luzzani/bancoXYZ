import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../features/auth/LoginScreen';
import { HomeScreen } from '../features/home/HomeScreen';
import { TransferScreen } from '../features/transfer/transferScreen';
import { RootStackParamList } from './types';
import { useAuthInitialization } from '../hooks/useAuthInitialization';
import { ErrorView } from '../components/common/ErrorView';
import { LoadingView } from '../components/common/LoadingView';
import { TransferListScreen } from '../features/transfer/TransferListScreen/TransferListScreen';

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
          <Stack.Screen name="TransferForm" component={TransferScreen} />
          <Stack.Screen name="TransferList" component={TransferListScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
