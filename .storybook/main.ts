import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import type { Configuration } from "webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config: Configuration) => {
    // `config.resolve`と`config.resolve.alias`の存在を確認
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // エイリアスを追加
    config.resolve.alias["@"] = path.resolve(__dirname, "../src");

    return config;
  },
};

export default config;
