import React, { useState } from "react";
import { Center } from "../../components/common/center/center";
import { SignInForm } from "./forms/signin-form";
import { SignUpForm } from "./forms/signup-form";

export const SignInComponent = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      <Center>
        <h1 className="text-center m-3">
          {isSignIn ? "ログイン" : "会員登録"}
        </h1>
      </Center>
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      <p onClick={() => setIsSignIn(!isSignIn)} className="mb-3">
        {!isSignIn ? "ログイン" : "会員登録"}はこちら
      </p>
    </>
  );
};
SignInComponent.displayName = "SignInTemplate";
export const SignInTemplate = React.memo(SignInComponent);
