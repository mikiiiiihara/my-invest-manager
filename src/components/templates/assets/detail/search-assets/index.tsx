import React, { useEffect, useState } from "react";
import { SearchBar } from "../../../../search-bar/search-bar";
import { AssetPanel } from "../../panels/asset-panel";
import { UsStockDetail } from "../../types";

type SearchTickerProps = {
  usStockDetails: UsStockDetail[];
  selectedFx: string;
};

export const SearchAssetsComponent: React.FC<SearchTickerProps> = ({
  usStockDetails,
  selectedFx,
}) => {
  const [tickerList, setTickerList] = useState(usStockDetails);

  useEffect(() => {
    setTickerList(usStockDetails);
  }, [selectedFx, usStockDetails]);

  const search = (searchValue: string) => {
    const result = usStockDetails.filter(
      (usStockDetail) =>
        usStockDetail.code.includes(searchValue) ||
        usStockDetail.sector.includes(searchValue)
    );

    setTickerList(result.length > 0 ? result : usStockDetails);
  };

  return (
    <>
      <SearchBar placeholder="銘柄名、セクターを検索" search={search} />
      <AssetPanel assetDetails={tickerList} currency={selectedFx} />
      <div className="clear-both"></div>
    </>
  );
};

SearchAssetsComponent.displayName = "SearchAssets";
export const SearchAssets = React.memo(SearchAssetsComponent);
