import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { FormGroup } from "@/components/forms/form-group";
import { UsStocksDocument, useCreateUsStockMutation } from "@/gql/graphql";
import { useApolloClient } from "@apollo/client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { sectorList } from "./sector-list";
import toast from "react-hot-toast";

type CreateUsStock = {
  code: string;
  getPrice: string;
  quantity: string;
  sector: string;
  usdJpy: string;
};

type Props = {
  setShowModal: Function;
};

const CreateUsStockFormComponent: FC<Props> = ({ setShowModal }) => {
  const { register, handleSubmit, reset } = useForm<CreateUsStock>();
  const client = useApolloClient();
  const [createUsStock] = useCreateUsStockMutation({
    update(cache, { data }) {
      const newUsStock = data?.createUsStock;
      if (!newUsStock) return;

      const existingUsStocksData = client.readQuery({
        query: UsStocksDocument,
      });

      // 新しい株式を既存のリストに追加
      const updatedUsStocks = existingUsStocksData
        ? [newUsStock, ...existingUsStocksData.usStocks]
        : [newUsStock];

      // キャッシュを更新
      client.writeQuery({
        query: UsStocksDocument,
        data: { usStocks: updatedUsStocks },
      });
    },
  });

  const onSubmit = handleSubmit(
    async ({ code, getPrice, quantity, sector, usdJpy }) => {
      try {
        await createUsStock({
          variables: {
            input: {
              code,
              getPrice: parseFloat(getPrice),
              quantity: parseFloat(quantity),
              sector,
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
      <h3>米国株を追加</h3>
      <FormGroup>
        <label htmlFor="code">ティッカーシンボル</label>
        <input
          type="text"
          className="form-control"
          {...register("code", { required: true })}
          placeholder="例: AAPL"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="getPrice">取得価格($)</label>
        <input
          type="number"
          step="any"
          className="form-control"
          {...register("getPrice", { required: true })}
          placeholder="例: 150.0"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="quantity">保有株数</label>
        <input
          type="number"
          step="any"
          className="form-control"
          {...register("quantity", { required: true })}
          placeholder="例: 10"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="sector">セクター</label>
        <select {...register("sector")} className="form-control">
          {sectorList
            .sort(function (a, b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
            .map((sector: { id: number; name: string }) => (
              <option key={sector.id} value={sector.name}>
                {sector.name}
              </option>
            ))}
        </select>
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

CreateUsStockFormComponent.displayName = "CreateUsStockForm";
export const CreateUsStockForm = React.memo(CreateUsStockFormComponent);
