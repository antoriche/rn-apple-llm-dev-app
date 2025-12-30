const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the default Expo config
const config = getDefaultConfig(__dirname);

// Get the path to your local library
const localLibPath = path.resolve(__dirname, 'react-native-apple-llm');

// Watch folders to include the local library
config.watchFolders = [
  __dirname,
  localLibPath,
];

// Block duplicate React Native modules from the local library
config.resolver.blockList = [
  // Prevent Metro from resolving React Native from the local library's node_modules
  new RegExp(`${path.resolve(localLibPath, 'node_modules')}/react-native/.*`),
  new RegExp(`${path.resolve(localLibPath, 'node_modules')}/@react-native/.*`),
];

// Ensure all React Native imports resolve to the app's node_modules
config.resolver.extraNodeModules = {
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  'react': path.resolve(__dirname, 'node_modules/react'),
};

// Ensure Metro can resolve symlinks
config.resolver.unstable_enableSymlinks = true;

module.exports = config;
