import { DangerButton } from "@/components/button/danger-button/danger-button";
import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { Loading } from "@/components/common/loading/loading";
import { FormGroup } from "@/components/forms/form-group";
import { Asset } from "@/features/assets/logic/calculate-all-assets";
import {
  JapanFundsDocument,
  useDeleteJapanFundMutation,
  useUpdateJapanFundMutation,
} from "@/gql/graphql";
import { useApolloClient } from "@apollo/client";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type UpdateJapanFund = {
  id: string;
  getPrice: string;
  getPriceTotal: string;
};

type Props = {
  assets: Asset[];
  setShowModal: Function;
};

const UpdateJapanFundFormComponent: FC<Props> = ({ assets, setShowModal }) => {
  // dafault values
  const [getPrice, setGetPrice] = useState("");
  const [getPriceTotal, setGetPriceTotal] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // フォーム表示用
  const selectList = assets.filter((asset) => asset.group == "japanFund");
  const { register, handleSubmit, reset } = useForm<UpdateJapanFund>();
  const client = useApolloClient();
  // 更新処理
  const [updateJapanFund, { loading: updateLoading }] =
    useUpdateJapanFundMutation();

  // 削除処理
  const [deleteJapanFund] = useDeleteJapanFundMutation({
    update(cache, { data }, { variables }) {
      // mutationの結果を確認
      if (!data?.deleteJapanFund) return;

      // 削除するアイテムのIDを取得
      if (variables == null) return;
      const deletedId = variables.id;

      const existingJapanFundData = client.readQuery({
        query: JapanFundsDocument,
      });

      const existingJapanFunds = existingJapanFundData?.japanFunds ?? [];

      // 削除対象の要素を除いた新しいリストを作成
      const updatedJapanFunds = existingJapanFunds.filter(
        (asset: any) => asset.id !== deletedId
      );

      // キャッシュを更新
      cache.writeQuery({
        query: JapanFundsDocument,
        data: { japanFunds: updatedJapanFunds },
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
          await deleteJapanFund({ variables: { id: selectedId.toString() } });
          toast.success("削除完了しました！");
          reset(); // フォームのリセット
          setShowModal(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const onSubmit = handleSubmit(async ({ id, getPrice, getPriceTotal }) => {
    // 全部nullの場合、実行できない
    if (getPrice.length == 0 && getPriceTotal.length == 0) {
      toast.error(`更新する項目を入力してください`);
      return;
    }
    try {
      await updateJapanFund({
        variables: {
          input: {
            id,
            getPrice: parseFloat(getPrice),
            getPriceTotal: parseFloat(getPriceTotal),
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
                  setGetPrice(asset?.getPrice.toString());
                  setGetPriceTotal(asset?.getPriceTotal.toString());
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
          <label htmlFor="getPrice">取得価格(¥)</label>
          <input
            type="number"
            step="any"
            className="form-control"
            {...register("getPrice")}
            placeholder="例: 11000.0"
            defaultValue={getPrice}
          />
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

UpdateJapanFundFormComponent.displayName = "UpdateJapanFundForm";
export const UpdateJapanFundForm = React.memo(UpdateJapanFundFormComponent);
