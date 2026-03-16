import { useState, useMemo, useCallback } from 'react';
import { TransferHistoryItem } from '../../../../../api/types';

export const useTransferFilters = (items: TransferHistoryItem[]) => {
  const [nameFilter, setNameFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesName =
        !nameFilter ||
        (item.payeer?.name?.toLowerCase().includes(nameFilter.toLowerCase()) ?? false);

      const matchesAmount = amountFilter === '' || item.value.toString().includes(amountFilter);

      const matchesDate = dateFilter === '' || item.date === dateFilter;

      return matchesName && matchesAmount && matchesDate;
    });
  }, [items, nameFilter, amountFilter, dateFilter]);

  const clearFilters = useCallback(() => {
    setNameFilter('');
    setAmountFilter('');
    setDateFilter('');
  }, []);

  const setters = useMemo(
    () => ({
      setName: setNameFilter,
      setAmount: setAmountFilter,
      setDate: setDateFilter,
    }),
    [],
  );

  return {
    filters: {
      name: nameFilter,
      amount: amountFilter,
      date: dateFilter,
    },
    setters,
    filteredItems,
    clearFilters,
  };
};
