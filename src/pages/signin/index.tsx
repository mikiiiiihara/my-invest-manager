import { Loading } from "@/components/common/loading/loading";
import { NextHead } from "@/components/common/next-head/nextHead";
import { SectorTemplate } from "@/components/templates/sector";
import { useMarketPricesQuery } from "@/gql/graphql";

const Sector = () => {
  const { data, loading } = useMarketPricesQuery();
  if (loading) return <Loading />;
  return (
    <>
      <NextHead title="My US Stock Portfolio | Signin" />
      <SectorTemplate sectors={data?.marketPrices || []} />
    </>
  );
};
export default Sector;
