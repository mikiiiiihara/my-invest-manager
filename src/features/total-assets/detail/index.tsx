import React, { FC, useCallback, useState } from "react";
import { Exact, TotalAsset, TotalAssetsQuery } from "@/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { StackedArea, StackedAreaType } from "@/components/graph/stacked-area";
import { themeForest } from "@/constants/theme-color";
import { SemiCircle } from "@/components/graph/semi-circle";
import {
  caluclateTotalAsset,
  caluculateAmountByAsset,
  caluculateAmountByCurrency,
  formatDate,
} from "../logic/calculate-total.asset";
import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { Modal } from "@/components/modal/modal";
import { UpdateTotalAssetForm } from "../form";

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

/**
 * 配列内のTotalAssetオブジェクトから各資産カテゴリごとのデータを抽出し、整理する
 */
function summarizeAssets(
  assets: TotalAsset[],
  currentUsdJpy: number
): StackedAreaType[] {
  // 各資産カテゴリに対応するデータを格納するためのマップオブジェクト
  const summaries = {
    cashJpy: [] as number[],
    cashUsd: [] as number[],
    crypto: [] as number[],
    fixedIncomeAsset: [] as number[],
    fund: [] as number[],
    stock: [] as number[],
  };

  // 各資産のデータをマップに追加
  assets.forEach((asset) => {
    summaries.cashJpy.push(asset.cashJpy);
    summaries.cashUsd.push(asset.cashUsd);
    summaries.crypto.push(asset.crypto);
    summaries.fixedIncomeAsset.push(asset.fixedIncomeAsset);
    summaries.fund.push(asset.fund);
    summaries.stock.push(asset.stock);
  });

  // 最終的な出力形式に変換
  return [
    { name: "Cash JPY", data: summaries.cashJpy },
    {
      name: "Cash USD",
      data: summaries.cashUsd.map(
        (value) => Math.round(value * currentUsdJpy * 10) / 10
      ),
    },
    { name: "Cryptocurrency", data: summaries.crypto },
    { name: "Fixed Income Assets", data: summaries.fixedIncomeAsset },
    { name: "Funds", data: summaries.fund },
    { name: "Stocks", data: summaries.stock },
  ];
}

const TotalAssetsDetailComponent: FC<Props> = ({
  totalAssets,
  refetch,
  currentUsdJpy,
}) => {
  const [showUpdModal, setUpdModal] = useState(false);
  const ShowUpdModal = useCallback(() => setUpdModal(true), []);
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

  // graphのseriesデータを計算
  const series: StackedAreaType[] = [
    {
      name: "資産総額",
      data: totalAssets.map((asset) =>
        caluclateTotalAsset(asset, currentUsdJpy)
      ),
    },
  ];
  // asset別のデータを計算
  const detailSeries = summarizeAssets(totalAssets, currentUsdJpy);

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
        series={series}
        themeColor={themeForest[0]}
        background="#343a40"
      />

      <StackedArea
        xData={totalAssets.map((asset) => formatDate(asset.createdAt))}
        series={detailSeries}
        background="#343a40"
      />
      <h1 className="mb-2">資産割合</h1>
      <PrimaryButton
        content="情報を更新"
        onClick={ShowUpdModal}
        isForContent={true}
      />
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
      <Modal
        showFlag={showUpdModal}
        setShowModal={setUpdModal}
        content={
          <UpdateTotalAssetForm
            latestTotalAsset={latestTotalAsset}
            setShowModal={setUpdModal}
          />
        }
      />
    </>
  );
};
TotalAssetsDetailComponent.displayName = "TotalAssetDetail";
export const TotalAssetDetail = React.memo(TotalAssetsDetailComponent);
