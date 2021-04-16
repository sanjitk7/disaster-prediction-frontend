var path = require('path');
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');

module.exports = function(config, env) {
  return Object.assign(
    config,
    override(
      fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      }),
      // add an alias for "our" imports
     
    )(config, env)
  );
};
