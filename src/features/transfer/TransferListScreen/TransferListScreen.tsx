import React, { useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTransferHistory } from './useTrasnferHistory';
import { useTransferFilters } from './components/TransferFilters/useTransferFilters';
import { TransferItem } from './components/TransferItems';
import { COLORS } from '../../../theme/colors';
import { TransferHistoryItem } from '../../../api/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { TransferFilters } from './components/TransferFilters';

type Props = NativeStackScreenProps<RootStackParamList, 'TransferList'>;

export const TransferListScreen = ({ navigation }: Props) => {
  const { items, isLoading, error, refreshHistory, isRefreshing } = useTransferHistory();

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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
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
          <>
            {isLoading && items.length === 0 ? (
              <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
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
                    refreshing={isRefreshing}
                    onRefresh={refreshHistory}
                    tintColor={COLORS.primary}
                  />
                }
              />
            )}
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  backButton: { paddingHorizontal: 24, paddingVertical: 8, backgroundColor: '#FFF' },
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
