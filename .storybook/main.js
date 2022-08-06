const path = require("path")

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/*.stories.js"
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
      components: path.resolve(__dirname, "../src/components"),
      hooks: path.resolve(__dirname, "../src/hooks"),
      src: path.resolve(__dirname, "../src"),
    }
    return config
  },
}
