import React, { FC } from "react";
import { Center } from "../../components/common/center/center";
import { SectorPanel } from "./panels/sector-panel";
import { calculateSectors } from "./logic/calculate-sector";
import { MarketData } from "@/types/market-data.type";

type Props = {
  sectors: MarketData[];
};

export const SectorTemplate: FC<Props> = ({ sectors }) => {
  const allSectorData = calculateSectors(sectors);
  return (
    <Center>
      <div className="content">
        <h4 className="sector-title">セクター別当落率（降順）</h4>
        <SectorPanel sectorList={allSectorData} />
      </div>
    </Center>
  );
};
