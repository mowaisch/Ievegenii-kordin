/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
 import LoginScreen from '../screens/LoginScreen';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 
 
 it('renders correctly', () => {
   renderer.create(<LoginScreen />);
 });
 