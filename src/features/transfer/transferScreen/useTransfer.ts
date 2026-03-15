import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Toast from 'react-native-toast-message';
import { resetTransferStatus } from '../../../store/slices/transfer';
import { executeTransfer } from '../../../store/slices/transfer/thunk';
import { unwrapResult } from '@reduxjs/toolkit';

export const useTransfer = () => {
  const dispatch = useAppDispatch();

  const { currentBalance } = useAppSelector(state => state.balance);
  const { isLoading, error: apiError } = useAppSelector(state => state.transfer);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const [amount, setAmount] = useState('');
  const [recipientDoc, setRecipientDoc] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const numericAmount = parseFloat(amount);
  let localError: string | null = null;

  if (amount) {
    if (isNaN(numericAmount)) localError = 'Monto inválido';
    else if (numericAmount <= 0) localError = 'Debe ser mayor a 0';
    else if (numericAmount > currentBalance) localError = 'Saldo insuficiente';
  }

  const isReady = amount.length > 0 && recipientDoc.length > 6 && !localError && !isLoading;

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

  const handleTransfer = async () => {
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
          ? `Se han enviado $${amount} correctamente.`
          : `Programada para el ${date.toLocaleDateString('es-AR')}.`,
        visibilityTime: 4000,
      });

      setAmount('');
      setRecipientDoc('');
      setDate(new Date());
      dispatch(resetTransferStatus());
    } catch (error) {
      console.log('Error en transferencia:', error);
    }
  };

  return {
    form: {
      amount,
      setAmount,
      recipientDoc,
      setRecipientDoc,
      date,
      setDate,
      showDatePicker,
      setShowDatePicker,
    },
    status: { isLoading, localError },
    confirmation: {
      isVisible: isConfirmModalVisible,
      show: () => {
        if (isReady) setIsConfirmModalVisible(true);
      },
      hide: () => setIsConfirmModalVisible(false),
      confirm: () => {
        setIsConfirmModalVisible(false);
        handleTransfer();
      },
    },
    isReady,
  };
};
