import { PrimaryButton } from "@/components/button/primary-button/primaryButton";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

type SignIn = {
  email: string;
  password: string;
};

const SignInFormComponent = () => {
  const { register, handleSubmit } = useForm<SignIn>();
  const router = useRouter();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.error.length > 0) {
      alert(data.error);
    } else {
      // エラーが発生していなければページ遷移
      router.push("/assets").then(() => {
        // ページのリロード
        window.location.reload();
      });
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="email">メールアドレス</label>
        <input
          type="text"
          className="form-control"
          {...register("email", { required: true })}
          placeholder="test@test.com"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          className="form-control"
          {...register("password", { required: true })}
          placeholder="*****"
        />
      </div>
      <PrimaryButton content="ログイン" className="mb-3 w-100" type="submit" />
    </form>
  );
};
SignInFormComponent.displayName = "SignInForm";
export const SignInForm = React.memo(SignInFormComponent);
