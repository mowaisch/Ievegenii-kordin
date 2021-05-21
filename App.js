import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as HomeProvider } from './src/context/HomeContext';
import { Provider as APIProvider } from './src/APIcall/ApiCallContext';

import { Context as AuthContext } from './src/context/AuthContext';

import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import CategoryScreen from './src/screens/realmDatabase/CategoryScreen';
import ProductScreen from './src/screens/realmDatabase/ProductScreen';

const AuthStack = createStackNavigator();

function authFlow() {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function homeFlow() {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ScannerScreen" component={ScannerScreen} />
      <HomeStack.Screen name="CategoryScreen" component={CategoryScreen} />
      <HomeStack.Screen name="ProductScreen" component={ProductScreen} />
    </HomeStack.Navigator>
  );
}

const Stack = createStackNavigator();

const App = () => {
  const { state } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.routeFlow === '' ?
          <Stack.Screen
            options={{ headerShown: false }}
            name="splash" component={SplashScreen} />
          : state.routeFlow === 'auth' ?
            <Stack.Screen
              options={{ headerShown: false }}
              name="authFlow" component={authFlow} />
            : state.routeFlow === 'SignedIn' ?
              <Stack.Screen
                options={{ headerShown: false }}
                name="mainFlow" component={homeFlow} />
              :
              null
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <APIProvider>
      <HomeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HomeProvider>
    </APIProvider>
  );
};