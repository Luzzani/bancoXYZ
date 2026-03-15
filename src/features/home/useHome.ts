import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

export const useHome = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { user, isLoading: isAuthLoading } = useAppSelector(state => state.auth);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Usuario';

  const goToTransfer = () => {
    navigation.navigate('TransferForm');
  };

  const goToHistory = () => {
    navigation.navigate('TransferList');
  };

  return {
    userName: firstName,
    isAuthLoading,
    goToTransfer,
    goToHistory,
  };
};
