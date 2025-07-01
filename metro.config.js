const { getDefaultConfig } = require('@expo/metro-config');
const path = require("path")
const config = getDefaultConfig(__dirname);
if (config.resolver.sourceExts && !config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}
config.resolver.unstable_enablePackageExports = false;
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  tslib: path.resolve(__dirname, 'node_modules/tslib'),
};
module.exports = config;