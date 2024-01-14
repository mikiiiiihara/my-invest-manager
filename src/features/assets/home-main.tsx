import React, { FC } from "react";
import { AssetDetails } from "./detail";
import { Summary } from "./summary";
import { UsStockDetail, UsStockSummary } from "./types";

type Props = {
  displayMode: string;
  usStockDetail: UsStockDetail[];
  usStockSummary: UsStockSummary;
};

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};

const HomeMainComponent: FC<Props> = ({
  displayMode,
  usStockDetail,
  usStockSummary,
}) => {
  return (
    <>
      {displayMode === DISPLAY_MODE.summary ? (
        <Summary usStockDetail={usStockDetail} />
      ) : (
        <AssetDetails usStockSummary={usStockSummary} />
      )}
    </>
  );
};
HomeMainComponent.displayName = "HomeMain";
export const HomeMain = React.memo(HomeMainComponent);
