import { NextHead } from "@/components/common/next-head/nextHead";
import { SignInTemplate } from "@/features/signin";

const SignIn = () => {
  return (
    <>
      <NextHead title="My US Stock Portfolio | SignIn" />
      <SignInTemplate />
    </>
  );
};
export default SignIn;
