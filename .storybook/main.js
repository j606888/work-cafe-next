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
      redux: path.resolve(__dirname, "../redux"),
      hooks: path.resolve(__dirname, "../hooks"),
      api: path.resolve(__dirname, "../api"),
      features: path.resolve(__dirname, "../features"),
      utils: path.resolve(__dirname, "../utils"),
    }
    return config
  },
  staticDirs: ["../public"]
}
