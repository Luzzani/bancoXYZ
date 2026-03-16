import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from '../../../../store/slices/balance';
import transferReducer from '../../../../store/slices/transfer';
import Toast from 'react-native-toast-message';
import { useTransfer } from '../useTransfer';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('../../../../store/slices/transfer/thunk', () => {
  const actualThunk = jest.requireActual('../../../../store/slices/transfer/thunk');
  return {
    ...actualThunk,
    executeTransfer: Object.assign(
      jest.fn(() => ({
        type: 'transfer/execute/fulfilled',
        payload: { status: 'success' },
      })),
      {
        pending: 'transfer/execute/pending',
        fulfilled: 'transfer/execute/fulfilled',
        rejected: 'transfer/execute/rejected',
      },
    ),
  };
});

describe('useTransfer Hook', () => {
  const setup = (initialBalance = 5000, apiError: string | null = null) => {
    const testStore = configureStore({
      reducer: {
        balance: balanceReducer,
        transfer: transferReducer,
      },
      preloadedState: {
        balance: {
          data: {
            balance: initialBalance,
            currency: 'ARS',
            lastMovement: '2026-01-01',
          },
          isLoading: false,
          error: null,
        } as any,
        transfer: {
          isLoading: false,
          error: apiError,
          status: apiError ? 'failed' : 'idle',
          isSuccess: false,
        } as any,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={testStore}>{children}</Provider>
    );

    return renderHook(() => useTransfer(), { wrapper });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería calcular el monto numérico y formatear el texto correctamente', () => {
    const { result } = setup();

    act(() => {
      result.current.form.setAmount('120050');
    });

    expect(result.current.form.amount).toBe('120.050');
  });

  it('debería mostrar error si el monto supera el saldo disponible', () => {
    const { result } = setup(1000);

    act(() => {
      result.current.form.setAmount('5000');
    });

    expect(result.current.status.localError).toBe('Saldo insuficiente');
    expect(result.current.isReady).toBe(false);
  });

  it('debería habilitar isReady cuando el form es válido', () => {
    const { result } = setup(10000);

    act(() => {
      result.current.form.setAmount('5000');
      result.current.form.setRecipientDoc('12345678');
    });

    expect(result.current.status.localError).toBe(null);
    expect(result.current.isReady).toBe(true);
  });

  it('debería llamar a Toast.show con error si la API tiene un error previo', () => {
    setup(5000, 'Error de red');

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text1: 'Error en la operación',
        text2: 'Error de red',
      }),
    );
  });

  it('debería ejecutar la transferencia y mostrar éxito cuando se confirma', async () => {
    const { result } = setup(10000);

    act(() => {
      result.current.form.setAmount('5000');
      result.current.form.setRecipientDoc('12345678');
    });

    expect(result.current.isReady).toBe(true);

    await act(async () => {
      result.current.confirmation.confirm();
    });

    await waitFor(
      () => {
        expect(result.current.form.amount).toBe('');
      },
      { timeout: 2000 },
    );

    await waitFor(() => {
      expect(result.current.form.recipientDoc).toBe('');
    });

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          text1: expect.stringMatching(/¡Transferencia Exitosa!|¡Programación Exitosa!/),
        }),
      );
    });
  });

  it('debería manejar errores de la API durante la transferencia', async () => {
    const { executeTransfer } = require('../../../../store/slices/transfer/thunk');
    executeTransfer.mockImplementationOnce(() => ({
      type: 'transfer/execute/rejected',
      error: { message: 'Fondos retenidos por seguridad' },
    }));

    const { result } = setup(10000);

    act(() => {
      result.current.form.setAmount('5000');
      result.current.form.setRecipientDoc('12345678');
    });

    await act(async () => {
      await result.current.confirmation.confirm();
    });

    expect(result.current.form.amount).toBe('5.000');
  });
});
