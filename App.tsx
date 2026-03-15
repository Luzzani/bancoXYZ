import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RootNavigator } from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { useAppInitialization } from './src/hooks/useAppInitialization';

export default function App() {
  const { appIsReady } = useAppInitialization();
  if (!appIsReady) return null;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
