import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Toast from 'react-native-toast-message';
import { resetTransferStatus } from '../../../store/slices/transfer';
import { executeTransfer } from '../../../store/slices/transfer/thunk';
import { unwrapResult } from '@reduxjs/toolkit';

export const useTransfer = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(state => state.balance);
  const { isLoading, error: apiError } = useAppSelector(state => state.transfer);

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipientDoc, setRecipientDoc] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const numericAmount = useMemo(() => {
    if (!amount) return 0;
    return parseFloat(amount.replace(/\./g, '')) || 0;
  }, [amount]);

  const handleAmountChange = useCallback((text: string) => {
    const cleanNumber = text.replace(/[^0-9]/g, '');
    if (!cleanNumber) {
      setAmount('');
      return;
    }
    const formatted = new Intl.NumberFormat('es-AR').format(parseInt(cleanNumber, 10));
    setAmount(formatted);
  }, []);

  const localError = useMemo(() => {
    if (!amount) return null;
    const safeBalance = data?.balance ?? 0;
    if (numericAmount <= 0) return 'Debe ser mayor a 0';
    if (numericAmount > safeBalance) return 'Saldo insuficiente';
    return null;
  }, [amount, numericAmount, data]);

  const isReady = useMemo(() => {
    return (
      amount.length > 0 && recipientDoc.length > 6 && !localError && !isLoading && data !== null
    );
  }, [amount.length, recipientDoc.length, localError, isLoading, data]);

  useEffect(() => {
    if (apiError) {
      Toast.show({
        type: 'error',
        text1: 'Error en la operación',
        text2: apiError,
      });
      dispatch(resetTransferStatus());
    }
  }, [apiError, dispatch]);

  const handleTransfer = useCallback(async () => {
    if (!isReady) return;

    try {
      const resultAction = await dispatch(
        executeTransfer({
          value: numericAmount,
          currency: 'ARS',
          payeerDocument: recipientDoc,
          transferDate: date.toISOString().split('T')[0],
        }),
      );

      unwrapResult(resultAction);

      const isToday = date.toDateString() === new Date().toDateString();

      Toast.show({
        type: 'success',
        text1: isToday ? '¡Transferencia Exitosa!' : '¡Programación Exitosa!',
        text2: isToday
          ? `Se han enviado $${new Intl.NumberFormat('es-AR').format(numericAmount)} correctamente.`
          : `Programada para el ${date.toLocaleDateString('es-AR')}.`,
        visibilityTime: 4000,
      });

      setAmount('');
      setRecipientDoc('');
      setDate(new Date());
      dispatch(resetTransferStatus());
    } catch (error) {
      console.log('Error:', error);
    }
  }, [isReady, numericAmount, recipientDoc, date, dispatch]);

  const confirmation = useMemo(
    () => ({
      isVisible: isConfirmModalVisible,
      show: () => isReady && setIsConfirmModalVisible(true),
      hide: () => setIsConfirmModalVisible(false),
      confirm: () => {
        setIsConfirmModalVisible(false);
        handleTransfer();
      },
    }),
    [isConfirmModalVisible, isReady, handleTransfer],
  );

  return {
    form: {
      amount,
      setAmount: handleAmountChange,
      recipientDoc,
      setRecipientDoc,
      date,
      setDate,
      showDatePicker,
      setShowDatePicker,
    },
    status: { isLoading, localError },
    confirmation,
    isReady,
  };
};
