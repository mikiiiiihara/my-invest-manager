import React, { FC, useCallback, useEffect, useState } from "react";
import { Center } from "../../common/center/center";
import { PrimaryButton } from "../../button/primary-button/primary-button";
import { Header } from "@/components/common/header/header";
import { Exact, TotalAsset, TotalAssetsQuery } from "@/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { StackedArea } from "@/components/graph/stacked-area";
import { themeForest } from "@/constants/theme-color";
import { Empty } from "@/components/graph/empty";
import { SemiCircle } from "@/components/graph/semi-circle";

type Props = {
  totalAssets: TotalAsset[];
  refetch: (
    variables?:
      | Partial<
          Exact<{
            day: number;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<TotalAssetsQuery>>;
  currentUsdJpy: number;
};

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月は0から始まるので1を加える
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
};

// 全アセットの総額を計算
const caluclateTotalAsset = (totalAsset: TotalAsset, currentUsdJpy: number) => {
  const { cashJpy, cashUsd, stock, fund, crypto, fixedIncomeAsset } =
    totalAsset;
  return Math.round(
    ((cashJpy +
      cashUsd * currentUsdJpy +
      stock +
      fund +
      crypto +
      fixedIncomeAsset) *
      10) /
      10
  );
};
type AssetAmount = {
  name: string;
  value: number;
};

// アセットごとの金額を計算
const caluculateAmountByAsset = (
  totalAsset: TotalAsset,
  currentUsdJpy: number
): AssetAmount[] => {
  const { cashJpy, cashUsd, stock, fund, crypto, fixedIncomeAsset } =
    totalAsset;
  // 株式・投資信託
  const stockAndFund = stock + fund;
  // 現金
  const cash = cashJpy + cashUsd * currentUsdJpy;
  return [
    { name: "現金", value: cash },
    { name: "債券・クラファンなど", value: fixedIncomeAsset },
    { name: "仮想通貨", value: crypto },
    { name: "株・投信", value: stockAndFund },
  ];
};

// 通貨ごとの金額を計算
const caluculateAmountByCurrency = (
  totalAsset: TotalAsset,
  currentUsdJpy: number
): AssetAmount[] => {
  const { cashJpy, cashUsd, stock, fund, crypto, fixedIncomeAsset } =
    totalAsset;
  // 円建て
  const jpy = cashJpy + crypto + fixedIncomeAsset;
  // ドル建て
  const usd = stock + cashUsd * currentUsdJpy + fund;
  return [
    { name: "円建て", value: jpy },
    { name: "ドル建て", value: usd },
  ];
};

const TotalAssetsComponent: FC<Props> = ({
  totalAssets,
  refetch,
  currentUsdJpy,
}) => {
  const latestTotalAsset = totalAssets[totalAssets.length - 1];
  console.log(latestTotalAsset);
  const amountsByAsset = caluculateAmountByAsset(
    latestTotalAsset,
    currentUsdJpy
  );
  const amountsByCurrency = caluculateAmountByCurrency(
    latestTotalAsset,
    currentUsdJpy
  );
  return (
    <Center>
      <Header />
      <div className="content">
        <h1>資産総額推移</h1>
        <h3>
          資産総額：¥
          {totalAssets.length > 0
            ? caluclateTotalAsset(
                latestTotalAsset,
                currentUsdJpy
              ).toLocaleString()
            : 0}
        </h3>
        {totalAssets.length > 0 ? (
          <>
            <PrimaryButton
              content="1週間"
              onClick={() => refetch({ day: 7 })}
            />
            <PrimaryButton
              content="1ヶ月"
              onClick={() => refetch({ day: 30 })}
            />
            <PrimaryButton
              content="3ヶ月"
              onClick={() => refetch({ day: 90 })}
            />
            <PrimaryButton
              content="全期間"
              onClick={() => refetch({ day: 0 })}
            />
            <StackedArea
              xData={totalAssets.map((asset) => formatDate(asset.createdAt))}
              yData={totalAssets.map((asset) =>
                caluclateTotalAsset(asset, currentUsdJpy)
              )}
              themeColor={themeForest[0]}
              background="#343a40"
            />
            <h1 className="mb-2">資産割合</h1>
            <h3>アセット別</h3>
            <SemiCircle
              values={amountsByAsset}
              themeColor={themeForest}
              background="#343a40"
            />
            <h3>通貨別</h3>
            <SemiCircle
              values={amountsByCurrency}
              themeColor={themeForest}
              background="#343a40"
            />
          </>
        ) : (
          <Empty />
        )}
      </div>
    </Center>
  );
};
TotalAssetsComponent.displayName = "TotalAssetTemplate";
export const TotalAssetTemplate = React.memo(TotalAssetsComponent);
