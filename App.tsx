import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RootNavigator } from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { setupHandlers } from './src/api/mocks/handlers';

export default function App() {
  setupHandlers();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
