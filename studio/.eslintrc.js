module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['react', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'react/prop-types': 0
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
};
