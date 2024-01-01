import React, { FC } from "react";
import { DisplayType, TickerPanelItem } from "./ticker-panel-item";
import { UsStockDetail } from "../types";

type Props = {
  tickerDetail: UsStockDetail[];
  currency: string;
  displayType?: DisplayType;
};

const TickerPanelComponent: FC<Props> = ({
  tickerDetail,
  currency,
  displayType,
}) => {
  return (
    <div>
      {tickerDetail.map((data) => (
        <div key={data.code}>
          <TickerPanelItem
            data={data}
            currency={currency}
            displayType={displayType}
          />
        </div>
      ))}
    </div>
  );
};
TickerPanelComponent.displayName = "TickerPanel";
export const TickerPanel = React.memo(TickerPanelComponent);
