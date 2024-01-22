import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { FormGroup } from "@/components/forms/form-group";
import { CRYPTO_LIST } from "@/constants/crypto-list";
import { CryptosDocument, useCreateCryptoMutation } from "@/gql/graphql";
import { useApolloClient } from "@apollo/client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateCrypto = {
  code: string;
  getPrice: string;
  quantity: string;
};

type Props = {
  setShowModal: Function;
};

const CreateCryptoFormComponent: FC<Props> = ({ setShowModal }) => {
  const { register, handleSubmit, reset } = useForm<CreateCrypto>();
  const client = useApolloClient();
  const [createCrypto] = useCreateCryptoMutation({
    update(_cache, { data }) {
      const newCrypto = data?.createCrypto;
      if (!newCrypto) return;

      const existingCryptoData = client.readQuery({
        query: CryptosDocument,
      });

      const existingCrypto = existingCryptoData?.cryptos ?? [];

      // 新しい資産を既存のリストに追加
      const updatedCryptos = [newCrypto, ...existingCrypto];

      // キャッシュを更新
      client.writeQuery({
        query: CryptosDocument,
        data: { cryptos: updatedCryptos },
      });
    },
  });

  const onSubmit = handleSubmit(async ({ code, getPrice, quantity }) => {
    try {
      await createCrypto({
        variables: {
          input: {
            code,
            getPrice: parseFloat(getPrice),
            quantity: parseFloat(quantity),
          },
        },
      });
      toast.success(`${code}を追加しました`);
      reset(); // フォームのリセット
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <label htmlFor="code">仮想通貨名</label>
        <select {...register("code")} className="form-control">
          {CRYPTO_LIST.sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          }).map((item: string) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </FormGroup>
      <FormGroup>
        <label htmlFor="getPriceTotal">取得価格(¥)</label>
        <input
          type="number"
          step="any"
          className="form-control"
          {...register("getPrice", { required: true })}
          placeholder="例: 20000"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="quantity">保有数量</label>
        <input
          type="number"
          step="any"
          className="form-control"
          {...register("quantity", { required: true })}
          placeholder="例: 10"
        />
      </FormGroup>
      <PrimaryButton content="追加" className="mb-3 w-100" type="submit" />
    </form>
  );
};

CreateCryptoFormComponent.displayName = "CreateCryptoForm";
export const CreateCryptoForm = React.memo(CreateCryptoFormComponent);
