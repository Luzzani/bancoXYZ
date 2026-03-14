import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../features/auth/LoginScreen';
import { HomeScreen } from '../features/home/HomeScreen';
import { TransferFormScreen } from '../features/transfer/TransferFormScreen';
import { TransferListScreen } from '../features/transfer/TransferListScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TransferForm" component={TransferFormScreen} />
      <Stack.Screen name="TransferList" component={TransferListScreen} />
    </Stack.Navigator>
  );
};
