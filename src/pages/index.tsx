import { TopContent } from "../contents/top/topContent";
import { NextHead } from "../components/common/next-head/nextHead";

const Top = () => {
  return (
    <>
      <NextHead title="My US Stock Portfolio | Top" />
      <TopContent />
    </>
  );
};
export default Top;
