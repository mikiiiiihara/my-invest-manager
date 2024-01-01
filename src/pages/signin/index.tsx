import { NextHead } from "@/components/common/next-head/nextHead";
import { SignInTemplate } from "@/components/templates/signin";

const SignIn = () => {
  return (
    <>
      <NextHead title="My US Stock Portfolio | SignIn" />
      <SignInTemplate />
    </>
  );
};
export default SignIn;
