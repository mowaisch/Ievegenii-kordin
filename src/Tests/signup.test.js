/**
 * @format
 */

import 'react-native';
import React from 'react';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
import SignUpScreen from '../screens/SignUpScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    renderer.create(<SignUpScreen />);
});
