import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { FormGroup } from "@/components/forms/form-group";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
    if (data.error) {
      toast.error(data.error);
    } else {
      // エラーが発生していなければページ遷移
      router.push("/top");
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="text"
          className="form-control"
          {...register("email", { required: true })}
          placeholder="test@test.com"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          className="form-control"
          {...register("password", { required: true })}
          placeholder="*****"
        />
      </FormGroup>
      <PrimaryButton content="ログイン" className="mb-3 w-100" type="submit" />
    </form>
  );
};
SignInFormComponent.displayName = "SignInForm";
export const SignInForm = React.memo(SignInFormComponent);
