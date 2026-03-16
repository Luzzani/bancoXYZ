import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { setupHandlers } from '../api/mocks/handlers';

export const useAppInitialization = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);

        setupHandlers();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  return { appIsReady };
};
