import { NextHead } from "../../components/common/next-head/nextHead";
import { Loading } from "../../components/common/loading/loading";
import { useCurrentUsdJpyQuery, useTotalAssetsQuery } from "../../gql/graphql";
import { TotalAssetTemplate } from "@/components/templates/total-assets";

const Assets = () => {
  const { data, loading, refetch } = useTotalAssetsQuery({
    variables: { day: 7 }, // デフォルトは7日間
  });
  const { data: currentUsdJpyQuery, loading: currentUsdJpyQueryLoading } =
    useCurrentUsdJpyQuery();
  if (loading || currentUsdJpyQueryLoading) return <Loading />;
  return (
    <div style={{ paddingBottom: "6rem" }}>
      <NextHead title="My US Stock Portfolio | Assets" />
      <TotalAssetTemplate
        totalAssets={data?.totalAssets ?? []}
        currentUsdJpy={currentUsdJpyQuery?.currentUsdJpy ?? 0}
        refetch={refetch}
      />
    </div>
  );
};
export default Assets;
