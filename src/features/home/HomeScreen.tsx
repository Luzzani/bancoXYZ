import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { BalanceCard } from '../balance/BalanceCard';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BancoXYZ</Text>
      <BalanceCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
