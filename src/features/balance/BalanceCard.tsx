import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { useBalance } from './useBalance';

export const BalanceCard = () => {
  const { amount, currency, isLoading, error, refetch } = useBalance();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0052cc" />
      </View>
    );
  }

  if (error) {
    return (
      <TouchableOpacity style={styles.errorContainer} onPress={refetch}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <Text style={styles.retryText}>Toca para reintentar</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo disponible</Text>
      <Text style={styles.amount}>
        {currency} {amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
      </Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 12,
    minHeight: 140,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  loadingContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.status.errorLight,
  },
  errorText: {
    color: COLORS.status.error,
    fontSize: 14,
    fontWeight: '600',
  },
  retryText: {
    marginTop: 8,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    color: COLORS.text.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  amount: {
    fontSize: 34,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
});
