import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { FormGroup } from "@/components/forms/form-group";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

type SignUp = {
  name: string;
  email: string;
  password: string;
};

const SignUpFormComponent = () => {
  const { register, handleSubmit } = useForm<SignUp>();
  const router = useRouter();

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.error) {
      alert(data.error);
    } else {
      // エラーが発生していなければページ遷移
      router.push("/assets");
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <label htmlFor="name">ニックネーム</label>
        <input
          type="text"
          className="form-control"
          {...register("name", { required: true })}
          placeholder="株式太郎"
        />
      </FormGroup>
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
      <PrimaryButton content="会員登録" className="mb-3 w-100" type="submit" />
    </form>
  );
};
SignUpFormComponent.displayName = "SignUpForm";
export const SignUpForm = React.memo(SignUpFormComponent);
