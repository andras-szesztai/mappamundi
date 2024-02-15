module.exports = {
    extends: 'airbnb',
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    plugins: ['react', 'react-hooks'],
}
