module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  core: {
    builder: "storybook-builder-vite",
  },
  // See https://github.com/eirslett/storybook-builder-vite/issues/139
  async viteFinal(config, { configType }) {
    if (configType === "DEVELOPMENT") {
      // customize the Vite config here
      config.server.port = 6001
      config.server.https = false
      config.server.host = true
      config.server.hmr = {
        port: 6002,
        protocol: "ws",
      }
    }

    // return the customized config
    return config
  },
}
