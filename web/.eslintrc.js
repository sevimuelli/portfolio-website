module.exports = {
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:react/jsx-runtime',
        'plugin:promise/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    },
    env: {
        es2024: true,
        node: true,
        browser: true,
    },
    settings: {
        'import/resolver': {
            jsconfig: {
                config: 'jsconfig.json',
            },
        },
    },
};
