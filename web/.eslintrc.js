module.exports = {
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:promise/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
        'react/forbid-prop-types': ['warn', { forbid: ['any'] }],
        'react/require-default-props': ['off'],
        'import/no-cycle': ['off'],
        'react/no-array-index-key': ['off'],
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
