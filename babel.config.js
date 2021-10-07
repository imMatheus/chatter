module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                // 'react-native-reanimated/plugin',
                'module-resolver',
                {
                    root: ['./src'],
                    extensions: [
                        '.ios.ts',
                        '.android.ts',
                        '.ts',
                        '.ios.tsx',
                        '.android.tsx',
                        '.tsx',
                        '.jsx',
                        '.js',
                        '.json',
                    ],
                    alias: {
                        '@src': './src',
                        '@base': '.',
                        '@assets': './src/assets',
                        '@components': './src/components',
                        '@constants': './src/constants',
                        '@context': './src/context',
                        '@hooks': './src/hooks',
                        '@screens': './src/screens',
                        '@customTypes': './types',
                        '@routes': './src/routes',
                        '@firebaseInit': './src/firebaseConfig',
                    },
                },
            ],
        ],
    }
}
