import React, { FC } from "react";
import { DisplayType, AssetPanelItem } from "./asset-panel-item";
import { UsStockDetail } from "../types";

type Props = {
  assetDetails: UsStockDetail[];
  currency: string;
  displayType?: DisplayType;
};

const AssetPanelComponent: FC<Props> = ({
  assetDetails,
  currency,
  displayType,
}) => {
  return (
    <div>
      {assetDetails.map((assets) => (
        <div key={assets.code}>
          <AssetPanelItem
            data={assets}
            currency={currency}
            displayType={displayType}
          />
        </div>
      ))}
    </div>
  );
};
AssetPanelComponent.displayName = "AssetPanel";
export const AssetPanel = React.memo(AssetPanelComponent);
