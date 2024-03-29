import { NextHead } from "../../components/common/next-head/nextHead";
import { Loading } from "../../components/common/loading/loading";
import {
  useCryptosQuery,
  useCurrentUsdJpyQuery,
  useFixedIncomeAssetsQuery,
  useJapanFundsQuery,
  useUsStocksQuery,
} from "../../gql/graphql";
import { AssetTemplate } from "../../features/assets";
import {
  AllAssets,
  CaluculateAllAssets,
} from "../../features/assets/logic/calculate-all-assets";

const Assets = () => {
  const { data: usStocksQuery, loading: usStocksQueryLoading } =
    useUsStocksQuery();

  const { data: currentUsdJpyQuery, loading: currentUsdJpyQueryLoading } =
    useCurrentUsdJpyQuery();

  const { data: cryptosQuery, loading: cryptosQueryLoading } =
    useCryptosQuery();

  const {
    data: fixedIncomeAssetsQuery,
    loading: fixedIncomeAssetsQueryLoading,
  } = useFixedIncomeAssetsQuery();

  const { data: japanFundsQuery, loading: japanFundsQueryLoading } =
    useJapanFundsQuery();

  if (
    usStocksQueryLoading ||
    currentUsdJpyQueryLoading ||
    cryptosQueryLoading ||
    fixedIncomeAssetsQueryLoading ||
    japanFundsQueryLoading
  )
    return <Loading />;

  const allAssets: AllAssets = {
    usStocks: usStocksQuery?.usStocks ?? [],
    japanFunds: japanFundsQuery?.japanFunds ?? [],
    cryptos: cryptosQuery?.cryptos ?? [],
    fixedIncomeAssets: fixedIncomeAssetsQuery?.fixedIncomeAssets ?? [],
  };
  // ４種類の資産を集約
  const assets = CaluculateAllAssets(allAssets);
  return (
    <div style={{ paddingBottom: "6rem" }}>
      <NextHead title="My US Stock Portfolio | Portfolio" />
      <AssetTemplate
        assets={assets ?? []}
        currentUsdJpy={currentUsdJpyQuery?.currentUsdJpy ?? 0}
      />
    </div>
  );
};
export default Assets;
