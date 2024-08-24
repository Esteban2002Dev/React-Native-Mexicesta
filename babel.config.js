module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/presentation/components',
          '@hooks': './src/presentation/hooks',
          '@navigation': './src/presentation/navigation',
          '@screens': './src/presentation/screens',
          '@store': './src/presentation/store',
          '@theme': './src/config/theme',
          '@interfaces': './src/data/interfaces',
          '@enums': './src/data/enums',
          '@constants': './src/constants',
          '@services': './src/services',
        },
      },
    ],
  ],
};
