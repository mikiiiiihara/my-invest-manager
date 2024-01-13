import React, { FC } from "react";
import { Center } from "../../components/common/center/center";
import { Exact, TotalAsset, TotalAssetsQuery } from "@/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { Empty } from "@/components/graph/empty";
import { caluclateTotalAsset } from "./logic/calculate-total.asset";
import { TotalAssetDetail } from "./detail";

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

const TotalAssetsComponent: FC<Props> = ({
  totalAssets,
  refetch,
  currentUsdJpy,
}) => {
  const latestTotalAsset = totalAssets[totalAssets.length - 1];
  return (
    <Center>
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
          <TotalAssetDetail
            totalAssets={totalAssets}
            refetch={refetch}
            currentUsdJpy={currentUsdJpy}
          />
        ) : (
          <Empty />
        )}
      </div>
    </Center>
  );
};
TotalAssetsComponent.displayName = "TotalAssetTemplate";
export const TotalAssetTemplate = React.memo(TotalAssetsComponent);
