import { DangerButton } from "@/components/button/danger-button/danger-button";
import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { Loading } from "@/components/common/loading/loading";
import { FormGroup } from "@/components/forms/form-group";
import { Asset } from "@/features/assets/logic/calculate-all-assets";
import {
  FixedIncomeAssetsDocument,
  useDeleteFixedIncomeAssetMutation,
  useUpdateFixedIncomeAssetMutation,
} from "@/gql/graphql";
import { useApolloClient } from "@apollo/client";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type UpdateFixIncomeAsset = {
  id: string;
  getPriceTotal: string;
  usdJpy: string;
};

type Props = {
  assets: Asset[];
  setShowModal: Function;
};

const UpdateFixedIncomeAssetFormComponent: FC<Props> = ({
  assets,
  setShowModal,
}) => {
  // dafault values
  const [getPriceTotal, setGetPriceTotal] = useState("");
  const [usdJpy, setUsdJpy] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // フォーム表示用
  const selectList = assets.filter(
    (asset) => asset.group == "fixedIncomeAsset"
  );
  const { register, handleSubmit, reset } = useForm<UpdateFixIncomeAsset>();
  const client = useApolloClient();
  // 更新処理
  const [updateFixedIncomeAsset, { loading: updateLoading }] =
    useUpdateFixedIncomeAssetMutation();

  // 削除処理
  const [deleteFixedIncomeAsset] = useDeleteFixedIncomeAssetMutation({
    update(cache, { data }, { variables }) {
      // mutationの結果を確認
      if (!data?.deleteFixedIncomeAsset) return;

      // 削除するアイテムのIDを取得
      if (variables == null) return;
      const deletedId = variables.id;

      const existingFixedIncomeAssetData = client.readQuery({
        query: FixedIncomeAssetsDocument,
      });

      const existingFixedIncomeAssets =
        existingFixedIncomeAssetData?.fixedIncomeAssets ?? [];

      // 削除対象の要素を除いた新しいリストを作成
      const updatedFixedIncomeAssets = existingFixedIncomeAssets.filter(
        (asset: any) => asset.id !== deletedId
      );

      // キャッシュを更新
      cache.writeQuery({
        query: FixedIncomeAssetsDocument,
        data: { fixedIncomeAssets: updatedFixedIncomeAssets },
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
          await deleteFixedIncomeAsset({
            variables: { id: selectedId.toString() },
          });
          toast.success("削除完了しました！");
          reset(); // フォームのリセット
          setShowModal(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const onSubmit = handleSubmit(async ({ id, getPriceTotal, usdJpy }) => {
    // 全部nullの場合、実行できない
    if (getPriceTotal.length == 0 && usdJpy.length == 0) {
      toast.error(`更新する項目を入力してください`);
      return;
    }
    try {
      await updateFixedIncomeAsset({
        variables: {
          input: {
            id,
            getPriceTotal: parseFloat(getPriceTotal),
            usdJpy: parseFloat(usdJpy),
          },
        },
      });
      toast.success(`更新しました`);
      reset(); // フォームのリセット
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  });

  const submitLoading = () => {
    if (updateLoading) {
      return <Loading />;
    }
  };

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
                  setGetPriceTotal(asset?.getPriceTotal.toString());
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
          <label htmlFor="getPriceTotal">取得価格総額(¥)</label>
          <input
            type="number"
            step="any"
            className="form-control"
            {...register("getPriceTotal")}
            placeholder="例: 200000.0"
            defaultValue={getPriceTotal}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="usdJpy">購入時為替</label>
          <p>日本円建ての場合1を入力</p>
          <input
            type="number"
            step="any"
            className="form-control"
            {...register("usdJpy")}
            placeholder="例: 110.0"
            defaultValue={usdJpy}
          />
        </FormGroup>
        <PrimaryButton content="更新" className="mb-3 w-100" type="submit" />
        {submitLoading()}
      </form>
      <DangerButton
        content="この銘柄を全売却"
        className="mb-3 w-100"
        onClick={executeDelete}
      />
    </>
  );
};

UpdateFixedIncomeAssetFormComponent.displayName = "UpdateFixedIncomeAssetForm";
export const UpdateFixedIncomeAssetForm = React.memo(
  UpdateFixedIncomeAssetFormComponent
);
