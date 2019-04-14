const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript({
  useFileSystemPublicRoutes: false,
  webpack(config) {
    config.resolve.modules.unshift(__dirname);
    return config;
  }
});
