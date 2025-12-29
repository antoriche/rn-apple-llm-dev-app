const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the default Expo config
const config = getDefaultConfig(__dirname);

// Get the path to your local library
//const localLibPath = path.resolve(__dirname, './node_modules/react-native-apple-llm');

// Watch folders outside the project directory
config.watchFolders = [
  __dirname,
  //localLibPath,
];

// Add node_modules paths to resolve modules properly
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  //path.resolve(localLibPath, 'node_modules'),
];

// Ensure Metro can resolve symlinks
config.resolver.unstable_enableSymlinks = true;

module.exports = config;
