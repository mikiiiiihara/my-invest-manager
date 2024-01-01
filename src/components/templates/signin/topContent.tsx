import React from "react";
import { Center } from "../../common/center/center";
import SignIn from "../../common/sign-in/signIn";
import { Header } from "../../common/header/header";

export const TopContentComponent = () => {
  return (
    <Center>
      <Header />
      <h1 className="text-center m-3">ログイン</h1>
      <SignIn />
    </Center>
  );
};
TopContentComponent.displayName = "TopContent";
export const TopContent = React.memo(TopContentComponent);
