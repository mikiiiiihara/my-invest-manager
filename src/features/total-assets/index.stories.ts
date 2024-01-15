import { Meta, StoryObj } from "@storybook/react";
import { TotalAsset, TotalAssetsQuery } from "@/gql/graphql";
import { Props, TotalAssetTemplate } from ".";
import { ApolloQueryResult } from "@apollo/client";

export default {
  title: "Templates/TotalAssetTemplate",
  component: TotalAssetTemplate,
} as Meta;

const mockTotalAssets: TotalAsset[] = [
  // ここにTotalAssetのモックデータを追加
  {
    cashJpy: 10000,
    cashUsd: 100,
    createdAt: "Sun Dec 17 2023 03:24:00 GMT",
    crypto: 10000,
    fixedIncomeAsset: 10000,
    fund: 10000,
    id: "1",
    stock: 10000,
  },
  {
    cashJpy: 10000,
    cashUsd: 100,
    createdAt: "Sun Dec 18 2023 03:24:00 GMT",
    crypto: 10000,
    fixedIncomeAsset: 10000,
    fund: 10000,
    id: "1",
    stock: 10400,
  },
];

// ここでTotalAssetsQueryに対応するモックデータを定義
const mockTotalAssetsData: TotalAssetsQuery = {
  totalAssets: mockTotalAssets,
};

const mockRefetch: (
  variables?: Partial<{
    day: number;
  }>
) => Promise<ApolloQueryResult<TotalAssetsQuery>> = (variables) => {
  // モックのrefetch関数を実装
  return Promise.resolve({
    data: mockTotalAssetsData,
    loading: false,
    networkStatus: 7,
    stale: false,
  });
};

export const Default: StoryObj<Props> = {
  args: {
    totalAssets: mockTotalAssets,
    refetch: mockRefetch,
    currentUsdJpy: 120, // USD/JPYの適当なレート
  },
};

const mockTotalAssetsOnlyStock: TotalAsset[] = [
  {
    cashJpy: 10000,
    cashUsd: 0,
    createdAt: "Sun Dec 17 2023 03:24:00 GMT",
    crypto: 0,
    fixedIncomeAsset: 0,
    fund: 0,
    id: "1",
    stock: 9900,
  },
  {
    cashJpy: 10000,
    cashUsd: 0,
    createdAt: "Sun Dec 18 2023 03:24:00 GMT",
    crypto: 0,
    fixedIncomeAsset: 0,
    fund: 0,
    id: "1",
    stock: 10000,
  },
];

// 仮想通貨、固定利回り資産は画面表示されない
export const 株式と日本円のみ保有している: StoryObj<Props> = {
  args: {
    totalAssets: mockTotalAssetsOnlyStock,
    refetch: mockRefetch,
    currentUsdJpy: 120,
  },
};

export const 資産が登録されていない: StoryObj<Props> = {
  args: {
    totalAssets: [],
    refetch: mockRefetch,
    currentUsdJpy: 120, // USD/JPYの適当なレート
  },
};
