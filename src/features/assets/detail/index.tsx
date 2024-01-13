import React, { useCallback, useState } from "react";
import { SearchAssets } from "./search-assets";
import { useTickerContext } from "../../../contexts/tickers-context";
import { Ranking } from "./ranking";
import { PrimaryButton } from "../../../components/button/primary-button/primary-button";
import { UsStockSummary } from "../types";

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};
type Props = {
  usStockSummary: UsStockSummary;
};
const AssetDetailsComponent: React.FC<Props> = ({ usStockSummary }) => {
  //表示切り替え用
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.detail);
  // サマリー画面を表示
  const changeDisplayToSummary = useCallback(() => {
    setDisplayMode(DISPLAY_MODE.summary);
  }, []);
  // 一覧画面を表示
  const changeDisplayToDetail = useCallback(() => {
    setDisplayMode(DISPLAY_MODE.detail);
  }, []);
  // コンテキストから以下を取得
  // (左から順に)画面表示する為替の値、画面表示する為替を切り替える関数、保有株式情報、現在のドル円
  const { fx } = useTickerContext();
  // 一覧表示用の配列をTickerでアルファベット順にソート
  const usStockDetails = [...usStockSummary.usStockDetails].sort((a, b) =>
    a.code.localeCompare(b.code)
  );

  return (
    <>
      <div className="m-3">
        <PrimaryButton
          content="銘柄別"
          notSelected={displayMode !== DISPLAY_MODE.detail}
          onClick={changeDisplayToDetail}
        />
        <PrimaryButton
          content="サマリー"
          notSelected={displayMode !== DISPLAY_MODE.summary}
          onClick={changeDisplayToSummary}
        />
      </div>
      {displayMode === DISPLAY_MODE.summary ? (
        <Ranking usStockDetails={usStockDetails} selectedFx={fx} />
      ) : (
        <SearchAssets usStockDetails={usStockDetails} selectedFx={fx} />
      )}
    </>
  );
};
AssetDetailsComponent.displayName = "AssetDetails";
export const AssetDetails = React.memo(AssetDetailsComponent);
