module.exports = {
    extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
    plugins: ['react', 'prettier'],
    // parser: '@babel/eslint-parser',
    rules: {
        'react/prop-types': 0,
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
};
