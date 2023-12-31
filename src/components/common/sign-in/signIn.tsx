import { useRouter } from "next/router";
import { PrimaryButton } from "../../primary-button/primaryButton";
import { useApolloClient } from "@apollo/client";

const SignIn = () => {
  const router = useRouter();
  // Apollo Clientのインスタンスを取得
  const apolloClient = useApolloClient();

  const executeLogin = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "drake@test.com",
          password: "abc123",
        }),
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);
    // Apollo Clientのキャッシュをリセット
    apolloClient.resetStore().then(() => {
      // ページ遷移
      router.push("/assets");
    });
  };
  return (
    <PrimaryButton
      content={"ログイン"}
      className="mb-3"
      onClick={executeLogin}
    />
  );
};
export default SignIn;
