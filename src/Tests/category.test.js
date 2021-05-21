/**
 * @format
 */
jest.useFakeTimers();
import 'react-native';
import React from 'react';


import CategoryScreen from '../screens/realmDatabase/CategoryScreen';
jest.mock('@react-navigation/native');
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


it('renders correctly', async () => {
    renderer.create(<CategoryScreen />);
});
