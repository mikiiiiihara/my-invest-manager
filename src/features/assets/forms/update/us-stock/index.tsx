import { DangerButton } from "@/components/button/danger-button/danger-button";
import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { FormGroup } from "@/components/forms/form-group";
import { Asset } from "@/features/assets/logic/calculate-all-assets";
import { UsStocksDocument, useDeleteUsStockMutation } from "@/gql/graphql";
import { useApolloClient } from "@apollo/client";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type UpdateUsStock = {
  id: string;
  getPrice: string;
  quantity: string;
  usdJpy: string;
};

type Props = {
  assets: Asset[];
  setShowModal: Function;
};

const UpdateUsStockFormComponent: FC<Props> = ({ assets, setShowModal }) => {
  // dafault values
  const [getPrice, setGetPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [usdJpy, setUsdJpy] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // フォーム表示用
  const selectList = assets.filter((asset) => asset.group == "usStock");
  const { register, handleSubmit, reset } = useForm<UpdateUsStock>();
  const client = useApolloClient();
  // 追加処理
  //   const [createUsStock] = useCreateUsStockMutation({
  //     update(_cache, { data }) {
  //       const newUsStock = data?.createUsStock;
  //       if (!newUsStock) return;

  //       const existingUsStocksData = client.readQuery({
  //         query: UsStocksDocument,
  //       });

  //       // 新しい株式を既存のリストに追加
  //       const updatedUsStocks = existingUsStocksData
  //         ? [newUsStock, ...existingUsStocksData.usStocks]
  //         : [newUsStock];

  //       // キャッシュを更新
  //       client.writeQuery({
  //         query: UsStocksDocument,
  //         data: { usStocks: updatedUsStocks },
  //       });
  //     },
  //   });

  // 削除処理
  const [deleteUsStock] = useDeleteUsStockMutation({
    update(cache, { data }, { variables }) {
      // mutationの結果を確認
      if (!data?.deleteUsStock) return;

      // 削除するアイテムのIDを取得
      if (variables == null) return;
      const deletedId = variables.id;

      const existingUsStockData = client.readQuery({
        query: UsStocksDocument,
      });

      const existingUsStocks = existingUsStockData?.usStocks ?? [];

      // 削除対象の要素を除いた新しいリストを作成
      const updatedUsStocks = existingUsStocks.filter(
        (asset: any) => asset.id !== deletedId
      );

      // キャッシュを更新
      cache.writeQuery({
        query: UsStocksDocument,
        data: { usStocks: updatedUsStocks },
      });
    },
  });

  // 削除処理のみを実行する関数
  const executeDelete = async () => {
    if (selectedId != null) {
      const myTicker = assets.find(
        (assets) => assets.id.toString() === selectedId.toString()
      );
      if (myTicker) {
        try {
          await deleteUsStock({ variables: { id: selectedId.toString() } });
          toast.success("削除完了しました！");
          reset(); // フォームのリセット
          setShowModal(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const onSubmit = handleSubmit(async ({ id, getPrice, quantity }) => {
    console.log(id, getPrice, quantity);
    // try {
    //   await createUsStock({
    //     variables: {
    //       input: {
    //         code,
    //         getPrice: parseFloat(getPrice),
    //         quantity: parseFloat(quantity),
    //         sector,
    //         usdJpy: parseFloat(usdJpy),
    //       },
    //     },
    //   });
    //   toast.success(`${code}を追加しました`);
    //   reset(); // フォームのリセット
    //   setShowModal(false);
    // } catch (error) {
    //   console.error(error);
    // }
  });
  return (
    <>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <label htmlFor="code">ティッカーシンボル</label>
          <select
            {...register("id", {
              onChange: (e) => {
                const selectedValue = parseInt(e.target.value);
                setSelectedId(selectedValue);
                const asset = selectList.find(
                  (element) => element.id == selectedValue
                );
                if (asset !== undefined) {
                  setGetPrice(asset?.getPrice.toString());
                  setQuantity(asset?.quantity.toString());
                  setUsdJpy(asset?.usdJpy.toString());
                }
              },
            })}
            className="form-control"
          >
            {selectList?.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.code}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <label htmlFor="getPrice">取得価格($)</label>
          <input
            type="number"
            step="any"
            className="form-control"
            {...register("getPrice", { required: true })}
            placeholder="例: 150.0"
            defaultValue={getPrice}
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
            defaultValue={quantity}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="usdJpy">購入時為替</label>
          <input
            type="number"
            step="any"
            className="form-control"
            {...register("usdJpy", { required: true })}
            placeholder="例: 110.0"
            defaultValue={usdJpy}
          />
        </FormGroup>
        <PrimaryButton content="更新" className="mb-3 w-100" type="submit" />
      </form>
      <DangerButton
        content="この銘柄を全売却"
        className="mb-3 w-100"
        onClick={executeDelete}
      />
    </>
  );
};

UpdateUsStockFormComponent.displayName = "UpdateUsStockForm";
export const UpdateUsStockForm = React.memo(UpdateUsStockFormComponent);
