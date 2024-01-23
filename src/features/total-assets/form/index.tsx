import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { FormGroup } from "@/components/forms/form-group";
import { TotalAsset, useUpdateTotalAssetMutation } from "@/gql/graphql";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type UpdateTotalAsset = {
  cashJpy: string;
  cashUsd: string;
};

type Props = {
  latestTotalAsset: TotalAsset;
  setShowModal: Function;
};

const UpdateTotallAssetFormComponent: FC<Props> = ({
  latestTotalAsset,
  setShowModal,
}) => {
  const { register, handleSubmit, reset } = useForm<UpdateTotalAsset>();
  // 追加処理
  const [updateTotalAsset] = useUpdateTotalAssetMutation();

  const onSubmit = handleSubmit(async ({ cashJpy, cashUsd }) => {
    try {
      await updateTotalAsset({
        variables: {
          input: {
            id: latestTotalAsset.id,
            cashJpy: parseFloat(cashJpy),
            cashUsd: parseFloat(cashUsd),
          },
        },
      });
      toast.success("現金を更新しました");
      reset(); // フォームのリセット
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <>
      <form onSubmit={onSubmit}>
        <h3>保有現金を変更</h3>
        <FormGroup>
          <label htmlFor="cashJpy">円(¥)</label>
          <input
            type="number"
            step="any"
            className="form-control"
            {...register("cashJpy", { required: true })}
            placeholder="例: 10000"
            defaultValue={latestTotalAsset.cashJpy}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="cashJpy">ドル($)</label>
          <input
            type="number"
            step="any"
            className="form-control"
            {...register("cashUsd", { required: true })}
            placeholder="例: 200"
            defaultValue={latestTotalAsset.cashUsd}
          />
        </FormGroup>
        <PrimaryButton content="更新" className="mb-3 w-100" type="submit" />
      </form>
    </>
  );
};

UpdateTotallAssetFormComponent.displayName = "UpdateTotalAssetForm";
export const UpdateTotalAssetForm = React.memo(UpdateTotallAssetFormComponent);
