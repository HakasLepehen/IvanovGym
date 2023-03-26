import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import { ClientPage } from './screens/ClientPage';
import { Home } from './screens/Home';
import store from './store/store';

const Stack = createNativeStackNavigator();
const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

const App = () => {
  return (
    <Provider store={ store }>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ClientPage" component={ClientPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
