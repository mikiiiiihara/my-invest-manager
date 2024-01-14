import React from "react";
import { AssetPanel } from "../../panels/asset-panel";
import { useTickersSummary } from "../../../../hooks/tickers-summary";
import { UsStockDetail } from "../../types";

type Props = {
  usStockDetails: UsStockDetail[];
  selectedFx: string;
};

const MemoizedAssetPanel = React.memo(AssetPanel); // AssetPanelコンポーネントをメモ化

const RankingComponent: React.FC<Props> = ({ usStockDetails, selectedFx }) => {
  // 値上がりTOP3
  const dataPriceRateDesc = useTickersSummary(
    usStockDetails,
    (a, b) => b.priceRate - a.priceRate,
    3
  );
  // 値下がりTOP3
  const dataPriceRateAsc = useTickersSummary(
    usStockDetails,
    (a, b) => a.priceRate - b.priceRate,
    3
  );
  // 含み益（額）TOP3
  const dataBalanceDesc = useTickersSummary(
    usStockDetails,
    (a, b) => b.balance - a.balance,
    3
  );
  // 含み損（額）TOP3
  const dataBalanceAsc = useTickersSummary(
    usStockDetails,
    (a, b) => a.balance - b.balance,
    3
  );
  // 含み益（率）TOP3
  const dataBalanceRateDesc = useTickersSummary(
    usStockDetails,
    (a, b) => b.balanceRate - a.balanceRate,
    3
  );
  // 含み益（率）TOP3
  const dataBalanceRateAsc = useTickersSummary(
    usStockDetails,
    (a, b) => a.balanceRate - b.balanceRate,
    3
  );
  return (
    <>
      <h3 className="ml-3">値上がりTOP3</h3>
      <MemoizedAssetPanel
        assetDetails={dataPriceRateDesc}
        currency={selectedFx}
      />
      <div className="clear-both"></div>
      <h3 className="ml-3">値下がりTOP3</h3>
      <MemoizedAssetPanel
        assetDetails={dataPriceRateAsc}
        currency={selectedFx}
      />
      <div className="clear-both"></div>
      <h3 className="ml-3">含み益（額）TOP3</h3>
      <MemoizedAssetPanel
        assetDetails={dataBalanceDesc}
        currency={selectedFx}
        displayType="balance"
      />
      <div className="clear-both"></div>
      <h3 className="ml-3">含み損（額）TOP3</h3>
      <MemoizedAssetPanel
        assetDetails={dataBalanceAsc}
        currency={selectedFx}
        displayType="balance"
      />
      <div className="clear-both"></div>
      <h3 className="ml-3">含み益（率）TOP3</h3>
      <MemoizedAssetPanel
        assetDetails={dataBalanceRateDesc}
        currency={selectedFx}
        displayType="balanceRate"
      />
      <div className="clear-both"></div>
      <h3 className="ml-3">含み損（率）TOP3</h3>
      <MemoizedAssetPanel
        assetDetails={dataBalanceRateAsc}
        currency={selectedFx}
        displayType="balanceRate"
      />
      <div className="clear-both"></div>
    </>
  );
};
RankingComponent.displayName = "Ranking";
export const Ranking = React.memo(RankingComponent);
