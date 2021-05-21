module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?(@react-native"
        + "|react-native"
        + "|react-native-gesture-handler"
        + "|react-native-iphone-x-helper"
        + "|react-native-vector-icons"
        + "|@react-native-async-storage"
        + "|react-native-qrcode-scanner"
        + "|react-native-permissions"
        + "|react-native-swipe-list-view"
      + ")/)",
    ],
  }