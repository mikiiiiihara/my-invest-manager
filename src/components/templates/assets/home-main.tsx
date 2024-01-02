import React, { FC } from "react";
import { AssetDetails } from "./detail";
import { SummaryContent } from "./summary";
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

export const HomeMain: FC<Props> = ({
  displayMode,
  usStockDetail,
  usStockSummary,
}) => {
  return (
    <>
      {displayMode === DISPLAY_MODE.summary ? (
        <SummaryContent usStockDetail={usStockDetail} />
      ) : (
        <AssetDetails usStockSummary={usStockSummary} />
      )}
    </>
  );
};
