import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TransferHistoryItem } from '../../../../../api/types';
import { COLORS } from '../../../../../theme/colors';

interface TransferItemProps {
  item: TransferHistoryItem;
}

const TransferItemComponent = ({ item }: TransferItemProps) => {
  const today = new Date().toISOString().split('T')[0];
  const isScheduled = item.date > today;

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={[styles.container, isScheduled && styles.scheduledContainer]}>
      <View style={styles.mainInfo}>
        <View style={[styles.iconCircle, isScheduled && styles.scheduledIcon]}>
          <Text style={[styles.iconText, isScheduled && styles.scheduledIconText]}>
            {isScheduled ? '🕒' : item.payeer.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {item.payeer.name}
            </Text>
            {isScheduled && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Programada</Text>
              </View>
            )}
          </View>
          <Text style={styles.date}>{formatDate(item.date)}</Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, isScheduled && styles.scheduledAmount]}>
          {isScheduled ? '' : '- '}
          {item.currency}{' '}
          {item.value.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
          })}
        </Text>
      </View>
    </View>
  );
};

export const TransferItem = memo(TransferItemComponent);

TransferItem.displayName = 'TransferItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  scheduledContainer: {
    backgroundColor: '#FAFAFA',
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.secondary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scheduledIcon: {
    backgroundColor: '#E0E0E0',
  },
  iconText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  scheduledIconText: {
    fontSize: 20,
  },
  details: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    maxWidth: '60%',
  },
  badge: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 13,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.status.error,
  },
  scheduledAmount: {
    color: COLORS.text.secondary,
  },
});
