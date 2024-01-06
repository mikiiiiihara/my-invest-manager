import React, { FC, useCallback, useEffect, useState } from "react";
import { Center } from "../../common/center/center";
import { PrimaryButton } from "../../button/primary-button/primary-button";
import { Header } from "@/components/common/header/header";
import { Exact, TotalAsset, TotalAssetsQuery } from "@/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { StackedArea } from "@/components/graph/StackedArea";
import { themeForest } from "@/constants/theme-color";

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

const caluclateTotalAsset = (totalAsset: TotalAsset, currentJpy: number) => {
  const { cashJpy, cashUsd, stock, fund, crypto, fixedIncomeAsset } =
    totalAsset;
  return Math.round(
    ((cashJpy +
      cashUsd * currentJpy +
      stock +
      fund +
      crypto +
      fixedIncomeAsset) *
      10) /
      10
  );
};

const TotalAssetsComponent: FC<Props> = ({
  totalAssets,
  refetch,
  currentUsdJpy,
}) => {
  return (
    <Center>
      <Header />
      <div className="content">
        <h1>資産総額推移</h1>
        <h3>
          資産総額：¥
          {totalAssets.length > 0
            ? caluclateTotalAsset(
                totalAssets[totalAssets.length - 1],
                currentUsdJpy
              ).toLocaleString()
            : 0}
        </h3>
        <PrimaryButton content="1週間" onClick={() => refetch({ day: 7 })} />
        <PrimaryButton content="1ヶ月" onClick={() => refetch({ day: 30 })} />
        <PrimaryButton content="3ヶ月" onClick={() => refetch({ day: 90 })} />
        <PrimaryButton content="全期間" onClick={() => refetch({ day: 0 })} />
        <StackedArea
          xData={totalAssets.map((asset) => formatDate(asset.createdAt))}
          yData={totalAssets.map((asset) =>
            caluclateTotalAsset(asset, currentUsdJpy)
          )}
          themeColor={themeForest[0]}
          background="#343a40"
        />
      </div>
    </Center>
  );
};
TotalAssetsComponent.displayName = "TotalAssetTemplate";
export const TotalAssetTemplate = React.memo(TotalAssetsComponent);
