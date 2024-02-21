module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'max-lines': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
  },
};
