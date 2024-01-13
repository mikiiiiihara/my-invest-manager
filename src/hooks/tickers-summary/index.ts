import { useMemo } from "react";
import { UsStockDetail } from "../../features/assets/types";

export const useTickersSummary = (
  usStockDetails: UsStockDetail[],
  compareFn: (a: UsStockDetail, b: UsStockDetail) => number,
  limit: number
) => {
  return useMemo(
    () => usStockDetails.sort(compareFn).slice(0, limit),
    [usStockDetails, compareFn, limit]
  );
};
