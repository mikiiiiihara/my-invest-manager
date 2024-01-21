import { Meta, StoryObj } from "@storybook/react";
import { AssetTemplate, Props } from ".";
import { Asset } from "./logic/calculate-all-assets";

export default {
  title: "Templates/AssetTemplate",
  component: AssetTemplate,
} as Meta;

// Assetのモックデータを作成
const mockAssets: Asset[] = [
  {
    code: "AAPL",
    currentPrice: 192.53,
    currentRate: -0.5424,
    dividend: 0.96,
    getPrice: 111.09,
    getPriceTotal: 111.09,
    group: "usStock",
    id: 2,
    priceGets: -1.05,
    quantity: 10,
    sector: "IT",
    usdJpy: 140,
  },
  {
    code: "btc",
    currentPrice: 6198001,
    currentRate: 0,
    dividend: 0,
    getPrice: 4548874.9,
    getPriceTotal: 4548874.9,
    group: "crypto",
    id: 1,
    priceGets: 0,
    quantity: 0.03526435,
    sector: "crypto",
    usdJpy: 1,
  },
  // その他のアセットデータ...
];

export const Default: StoryObj<Props> = {
  args: {
    assets: mockAssets,
    currentUsdJpy: 140, // USD/JPYの適当なレート
  },
};

export const NotOwnedAssets: StoryObj<Props> = {
  args: {
    assets: [],
    currentUsdJpy: 140, // USD/JPYの適当なレート
  },
};
