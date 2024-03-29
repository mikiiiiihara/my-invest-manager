import React, { useCallback, useMemo, useState } from "react";
import { SearchAssets } from "./search-assets";
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
  // 一覧表示用の配列をTickerでアルファベット順にソート
  const usStockDetails = useMemo(() => {
    return [...usStockSummary.usStockDetails].sort((a, b) =>
      a.code.localeCompare(b.code)
    );
  }, [usStockSummary]);

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
        <Ranking usStockDetails={usStockDetails} selectedFx={"¥"} />
      ) : (
        <SearchAssets usStockDetails={usStockDetails} selectedFx={"¥"} />
      )}
    </>
  );
};
AssetDetailsComponent.displayName = "AssetDetails";
export const AssetDetails = React.memo(AssetDetailsComponent);
