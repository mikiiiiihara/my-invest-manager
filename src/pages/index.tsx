import { TopTemplate } from "@/components/templates/top";
import { NextHead } from "../components/common/next-head/nextHead";

const Top = () => {
  return (
    <>
      <NextHead title="My US Stock Portfolio | Top" />
      <TopTemplate />
    </>
  );
};
export default Top;
