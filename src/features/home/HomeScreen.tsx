import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { COLORS } from '../../theme/colors';
import { BalanceCard } from '../balance/BalanceCard';
import { Button } from '../../components/common/Button';
import { useHome } from './useHome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const { userName, goToTransfer, goToHistory } = useHome();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hola,</Text>
          <Text style={styles.userName}>{userName || 'Usuario'}</Text>
        </View>
      </View>

      <View style={styles.balanceSection}>
        <BalanceCard />
      </View>

      <View style={styles.actionsContainer}>
        <Button text="Transferir Dinero" onPress={goToTransfer} />

        <Button text="Ver Actividad" onPress={goToHistory} style={[styles.showActivityButton]} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    color: COLORS.text.secondary || '#666',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text.primary || '#333',
  },
  balanceSection: {
    marginBottom: 30,
  },
  actionsContainer: {
    width: '100%',
  },
  showActivityButton: { backgroundColor: COLORS.secondary, marginTop: 12 },
});
