import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageError, StorageErrorType } from './types';
import { User } from '../features/auth/types';

const TOKEN_KEY = 'user_token';
const USER_DATA_KEY = 'user_data';

const secureOptions: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
  requireAuthentication: false,
};

export const saveToken = async (token: string): Promise<void> => {
  try {
    if (!token || token.trim() === '') throw new Error('Token inválido o vacío');
    await SecureStore.setItemAsync(TOKEN_KEY, token, secureOptions);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message.toLowerCase() : 'Error desconocido.';
    if (message.includes('unauthenticated') || message.includes('secure lock')) {
      throw new StorageError(
        StorageErrorType.DEVICE_NOT_SECURE,
        'Se requiere que el dispositivo tenga un PIN o Biometría configurada',
        error,
      );
    }
    throw new StorageError(
      StorageErrorType.PERSISTENCE_FAILED,
      'No se pudo establecer la sesión segura en el hardware',
      error,
    );
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY, secureOptions);
  } catch (error: unknown) {
    throw new StorageError(
      StorageErrorType.READ_FAILED,
      'Error crítico al intentar leer la llave de seguridad',
      error,
    );
  }
};

export const deleteToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error: unknown) {
    throw new StorageError(
      StorageErrorType.DELETE_FAILED,
      'No se pudo limpiar la sesión de forma segura',
      error,
    );
  }
};

export const saveUserData = async (user: User): Promise<void> => {
  try {
    if (!user) throw new Error('Datos de usuario inválidos');
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  } catch (error: unknown) {
    throw new StorageError(
      StorageErrorType.PERSISTENCE_FAILED,
      'No se pudo persistir la información del usuario',
      error,
    );
  }
};

export const getUserData = async (): Promise<User | null> => {
  try {
    const data = await AsyncStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error: unknown) {
    throw new StorageError(
      StorageErrorType.READ_FAILED,
      'Error al leer los datos de usuario del storage',
      error,
    );
  }
};

export const deleteUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (error: unknown) {
    throw new StorageError(
      StorageErrorType.DELETE_FAILED,
      'No se pudo eliminar la información del usuario',
      error,
    );
  }
};
