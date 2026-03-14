import * as SecureStore from 'expo-secure-store';
import { StorageError, StorageErrorType } from './types';

const TOKEN_KEY = 'user_token';

const secureOptions: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
  requireAuthentication: false,
};

/**
 * @param {string} token
 * @throws {StorageError}
 */

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

/**
 * @returns {Promise<string | null>}
 * @throws {StorageError}
 */

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

/**
 * @returns {Promise<void>}
 * @throws {StorageError}
 */

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
