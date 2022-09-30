const path = require("path")

module.exports = {
  stories: [
    "../components/**/*.stories.js",
    "../features/**/*.stories.js"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, "../components"),
      hooks: path.resolve(__dirname, "../hooks"),
      config: path.resolve(__dirname, "../config"),
      store: path.resolve(__dirname, "../store"),
      hooks: path.resolve(__dirname, "../hooks"),
      api: path.resolve(__dirname, "../api"),
      features: path.resolve(__dirname, "../features"),
      utils: path.resolve(__dirname, "../utils"),
      constant: path.resolve(__dirname, "../constant"),
    }
    return config
  },
  staticDirs: ["../public"],
  env: (config) => ({
    ...config,
    STORYBOOK_MODE: 'ON'
  })
}
