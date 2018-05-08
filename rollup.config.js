import es2015Rollup from 'babel-preset-es2015-rollup';
var babel = require('rollup-plugin-babel');

module.exports = {
  external: [
    'gcloud',
    'js-data',
    'js-data-adapter'
  ],
  plugins: [
    babel({
      babelrc: false,
      presets: [
        es2015Rollup
      ],
      exclude: 'node_modules/**'
    })
  ]
};
