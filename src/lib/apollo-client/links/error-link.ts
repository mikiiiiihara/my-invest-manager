import { onError } from "@apollo/client/link/error";
import toast from "react-hot-toast";

const executeRefreshToken = async () => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Send the cookies
  })
    .then((response) => {
      // レスポンスが 400 または 500 の範囲にある場合、エラーとして処理します
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }
      console.log(response);
      return response.json();
    })
    .then(() => {
      window.location.href = "/assets";
    })
    .catch((error) => {
      console.error(error);
      // ログイン画面にリダイレクトします
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
        return;
      }
    });
};

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case "UNAUTHENTICATED":
          executeRefreshToken();
          break;
        default:
          console.log(`[GraphQL error]: ${err.message}`);
          // ポップアップを表示
          toast.error(`${err.message}`);
          break;
      }
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
