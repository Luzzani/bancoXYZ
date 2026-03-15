import React, { useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  RefreshControl,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTransferHistory } from './useTrasnferHistory';
import { useTransferFilters } from './components/TrasnferFilters/useTransferFilters';
import { TransferFilters } from './components/TrasnferFilters';
import { TransferItem } from './components/TransferItems';
import { COLORS } from '../../../theme/colors';
import { TransferHistoryItem } from '../../../api/types';

export const TransferListScreen = () => {
  const { items, isLoading, error, refreshHistory } = useTransferHistory();

  const { filteredItems, filters, setters, clearFilters } = useTransferFilters(items);

  const listEmptyComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {items.length === 0 ? 'No tienes transferencias.' : 'Sin resultados para los filtros.'}
        </Text>
      </View>
    ),
    [items.length],
  );

  const renderItem = useCallback(
    ({ item }: { item: TransferHistoryItem }) => <TransferItem item={item} />,
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TransferFilters
          name={filters.name}
          amount={filters.amount}
          date={filters.date}
          setName={setters.setName}
          setAmount={setters.setAmount}
          setDate={setters.setDate}
          onClear={clearFilters}
        />

        {error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item, index) => `${item.payeer.document}-${index}`}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={listEmptyComponent}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={refreshHistory}
                tintColor={COLORS.primary}
              />
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 22,
  },
  errorText: {
    color: COLORS.status.error,
    fontSize: 14,
    textAlign: 'center',
  },
});
