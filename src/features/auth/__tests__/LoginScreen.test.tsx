import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { LoginScreen } from '../LoginScreen';
import authReducer from '../../../store/slices/auth';
import { AuthState } from '../../../store/slices/auth/types';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('expo-font', () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
}));

jest.mock('../../../store/slices/auth/thunks', () => {
  const mockThunk = (type: string) => {
    const actionCreator = (payload: any) => ({ type, payload });
    actionCreator.pending = `${type}/pending`;
    actionCreator.fulfilled = `${type}/fulfilled`;
    actionCreator.rejected = `${type}/rejected`;
    actionCreator.typePrefix = type;
    return actionCreator;
  };

  return {
    login: mockThunk('auth/login'),
    initializeAuth: mockThunk('auth/initializeAuth'),
    logout: mockThunk('auth/logout'),
  };
});

const defaultAuthState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isInitializing: false,
  storageError: null,
};

const createMockStore = (stateOverrides = {}) => {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { ...defaultAuthState, ...stateOverrides },
    },
  });
};

describe('LoginScreen Integration Test', () => {
  beforeAll(() => {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const message = args.join(' ');
      if (
        message.includes('act(') ||
        message.includes('Animated') ||
        message.includes('update inside a test')
      ) {
        return;
      }
      originalError.apply(console, args);
    };
  });

  it('debería mostrar errores de validación local si los campos están vacíos', () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    fireEvent.press(getByText('Entrar'));
    expect(getByText('El correo es obligatorio.')).toBeTruthy();
    expect(getByText('La contraseña es obligatoria.')).toBeTruthy();
  });

  it('debería llamar al dispatch de login con datos válidos', () => {
    const store = createMockStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    fireEvent.changeText(getByPlaceholderText('ejemplo@mail.com'), 'test@banco.com');
    fireEvent.changeText(getByPlaceholderText('Tu clave de 6 dígitos'), '123456');
    fireEvent.press(getByText('Entrar'));

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'auth/login',
        payload: { email: 'test@banco.com', password: '123456' },
      }),
    );
  });

  it('debería mostrar el error general cuando el servidor devuelve un error', () => {
    const store = createMockStore({ error: { message: 'Credenciales inválidas' } });
    const { getByText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    expect(getByText('Credenciales inválidas')).toBeTruthy();
  });

  it('debería ocultar el texto del botón cuando isLoading es true', () => {
    const store = createMockStore({ isLoading: true });
    const { queryByText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    expect(queryByText('Entrar')).toBeNull();
  });

  it('debería limpiar los errores cuando el usuario vuelve a escribir', () => {
    const store = createMockStore();
    const { getByPlaceholderText, queryByText, getByText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    fireEvent.press(getByText('Entrar'));
    expect(getByText('El correo es obligatorio.')).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('ejemplo@mail.com'), 'a');
    expect(queryByText('El correo es obligatorio.')).toBeNull();
  });
});
