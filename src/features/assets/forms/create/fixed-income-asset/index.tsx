import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { FormGroup } from "@/components/forms/form-group";
import {
  FixedIncomeAssetsDocument,
  useCreateFixedIncomeAssetMutation,
} from "@/gql/graphql";
import { useApolloClient } from "@apollo/client";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateFixedIncomeAsset = {
  code: string;
  getPriceTotal: string;
  dividendRate: string;
  usdJpy: string;
  paymentMonth: number[];
};

type Props = {
  setShowModal: Function;
};

const CreateFixedIncomeAssetFormComponent: FC<Props> = ({ setShowModal }) => {
  const { register, handleSubmit, reset, control } =
    useForm<CreateFixedIncomeAsset>({
      defaultValues: {
        // ...他のデフォルト値
        paymentMonth: [], // paymentMonthのデフォルト値を空の配列に設定
      },
    });
  const client = useApolloClient();
  const [createFixedIncomeAsset] = useCreateFixedIncomeAssetMutation({
    update(_cache, { data }) {
      const newFixedIncomeAsset = data?.createFixedIncomeAsset;
      if (!newFixedIncomeAsset) return;

      const existingFixedIncomeAssetData = client.readQuery({
        query: FixedIncomeAssetsDocument,
      });

      const existingFixedIncomeAssets =
        existingFixedIncomeAssetData?.fixedIncomeAssets ?? [];

      // 新しい資産を既存のリストに追加
      const updatedFixedIncomeAssets = [
        newFixedIncomeAsset,
        ...existingFixedIncomeAssets,
      ];

      // キャッシュを更新
      client.writeQuery({
        query: FixedIncomeAssetsDocument,
        data: { fixedIncomeAssets: updatedFixedIncomeAssets },
      });
    },
  });

  const onSubmit = handleSubmit(
    async ({ code, getPriceTotal, dividendRate, usdJpy, paymentMonth }) => {
      try {
        await createFixedIncomeAsset({
          variables: {
            input: {
              code,
              getPriceTotal: parseFloat(getPriceTotal),
              dividendRate: parseFloat(dividendRate),
              paymentMonth,
              usdJpy: parseFloat(usdJpy),
            },
          },
        });
        toast.success(`${code}を追加しました`);
        reset(); // フォームのリセット
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  );
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <label htmlFor="code">ティッカーシンボル</label>
        <input
          type="text"
          className="form-control"
          {...register("code", { required: true })}
          placeholder="例: 米国債"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="getPriceTotal">取得価格総額</label>
        <input
          type="number"
          step="any"
          className="form-control"
          {...register("getPriceTotal", { required: true })}
          placeholder="例: 20000"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="dividendRate">配当利回り</label>
        <input
          type="number"
          step="any"
          className="form-control"
          {...register("dividendRate", { required: true })}
          placeholder="例: 3.5"
        />
      </FormGroup>
      <FormGroup>
        <label>支払月</label>
        <div>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <Controller
              key={month}
              name="paymentMonth"
              control={control}
              render={({ field }) => (
                <label key={month}>
                  <input
                    type="checkbox"
                    value={month}
                    checked={field.value.includes(month)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, month]);
                      } else {
                        field.onChange(field.value.filter((m) => m !== month));
                      }
                    }}
                  />
                  {month}月
                </label>
              )}
            />
          ))}
        </div>
      </FormGroup>
      <FormGroup>
        <label htmlFor="usdJpy">購入時為替</label>
        <input
          type="number"
          step="any"
          className="form-control"
          {...register("usdJpy", { required: true })}
          placeholder="例: 110.0"
        />
      </FormGroup>
      <PrimaryButton content="追加" className="mb-3 w-100" type="submit" />
    </form>
  );
};

CreateFixedIncomeAssetFormComponent.displayName = "CreateFixedIncomeAssetForm";
export const CreateFixedIncomeAssetForm = React.memo(
  CreateFixedIncomeAssetFormComponent
);
