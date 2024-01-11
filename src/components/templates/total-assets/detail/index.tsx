import React, { FC } from "react";
import { Exact, TotalAsset, TotalAssetsQuery } from "@/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { StackedArea } from "@/components/graph/stacked-area";
import { themeForest } from "@/constants/theme-color";
import { SemiCircle } from "@/components/graph/semi-circle";
import {
  caluclateTotalAsset,
  caluculateAmountByAsset,
  caluculateAmountByCurrency,
  formatDate,
} from "../logic/calculate-total.asset";
import { PrimaryButton } from "@/components/button/primary-button/primary-button";

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

const TotalAssetsDetailComponent: FC<Props> = ({
  totalAssets,
  refetch,
  currentUsdJpy,
}) => {
  const latestTotalAsset = totalAssets[totalAssets.length - 1];
  // 一番古い資産の総額を取得
  const prevTotalAssetPrice = caluclateTotalAsset(
    totalAssets[0],
    currentUsdJpy
  );
  const amountsByAsset = caluculateAmountByAsset(
    latestTotalAsset,
    currentUsdJpy
  );
  const amountsByCurrency = caluculateAmountByCurrency(
    latestTotalAsset,
    currentUsdJpy
  );
  const latestTotalAssetPrice = caluclateTotalAsset(
    latestTotalAsset,
    currentUsdJpy
  );
  // 前日比の差分
  const priceGap = latestTotalAssetPrice - prevTotalAssetPrice;
  // 前日比(%)の計算
  const priceRate = (100 * priceGap) / prevTotalAssetPrice;
  const priceRateBalance = priceRate > 0 ? "text-success" : "text-danger";
  const balanceIcon = priceRate > 0 ? "+" : "";
  const displayPriceRate = isNaN(priceRate)
    ? "-"
    : (Math.round(priceRate * 100) / 100).toLocaleString();
  return (
    <>
      <p className={priceRateBalance}>
        増減:¥{balanceIcon}
        {priceGap.toLocaleString()}({balanceIcon}
        {displayPriceRate}%)
      </p>
      <PrimaryButton content="1日" onClick={() => refetch({ day: 2 })} />
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
  );
};
TotalAssetsDetailComponent.displayName = "TotalAssetDetail";
export const TotalAssetDetail = React.memo(TotalAssetsDetailComponent);
