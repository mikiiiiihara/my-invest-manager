import { TotalAsset } from "@/gql/graphql";

/**
 *
 * @param isoString :isoの日付文字列
 * @returns string :YYYY/MM/dd
 */
export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月は0から始まるので1を加える
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
};

/**
 * 全アセットの総額を計算
 */
export const caluclateTotalAsset = (
  totalAsset: TotalAsset,
  currentUsdJpy: number
) => {
  const { cashJpy, cashUsd, stock, fund, crypto, fixedIncomeAsset } =
    totalAsset;
  return Math.round(
    ((cashJpy +
      cashUsd * currentUsdJpy +
      stock +
      fund +
      crypto +
      fixedIncomeAsset) *
      10) /
      10
  );
};

type AssetAmount = {
  name: string;
  value: number;
};

/**
 * アセットごとの金額を計算
 */
export const caluculateAmountByAsset = (
  totalAsset: TotalAsset,
  currentUsdJpy: number
): AssetAmount[] => {
  const { cashJpy, cashUsd, stock, fund, crypto, fixedIncomeAsset } =
    totalAsset;
  // 株式・投資信託
  const stockAndFund = stock + fund;
  // 現金
  const cash = cashJpy + cashUsd * currentUsdJpy;
  let amountByAssets: AssetAmount[] = new Array();
  if (cash != 0) amountByAssets.push({ name: "現金", value: cash });
  if (fixedIncomeAsset != 0)
    amountByAssets.push({
      name: "債券・クラファンなど",
      value: fixedIncomeAsset,
    });
  if (crypto != 0) amountByAssets.push({ name: "仮想通貨", value: crypto });
  if (stockAndFund != 0)
    amountByAssets.push({ name: "株・投信", value: stockAndFund });
  return amountByAssets;
};

/**
 * 通貨ごとの金額を計算
 * */
export const caluculateAmountByCurrency = (
  totalAsset: TotalAsset,
  currentUsdJpy: number
): AssetAmount[] => {
  const { cashJpy, cashUsd, stock, fund, crypto, fixedIncomeAsset } =
    totalAsset;
  // 円建て
  const jpy = cashJpy + crypto + fixedIncomeAsset;
  // ドル建て
  const usd = stock + cashUsd * currentUsdJpy + fund;
  return [
    { name: "円建て", value: jpy },
    { name: "ドル建て", value: usd },
  ];
};
