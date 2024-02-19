import { PrimaryButton } from "@/components/button/primary-button/primary-button";
import { FormGroup } from "@/components/forms/form-group";
import { JAPAN_FUND_LIST } from "@/constants/japan-fund-list";
import { JapanFundsDocument, useCreateJapanFundMutation } from "@/gql/graphql";
import { useApolloClient } from "@apollo/client";
import React, { ChangeEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateJapanFund = {
  code: string;
  name: string;
  getPrice: string;
  getPriceTotal: string;
};

type Props = {
  setShowModal: Function;
};

const CreateJapanFundFormComponent: FC<Props> = ({ setShowModal }) => {
  // dafault values
  const [name, setName] = useState("");
  const { register, handleSubmit, reset } = useForm<CreateJapanFund>();
  const client = useApolloClient();
  const [createJapanFund] = useCreateJapanFundMutation({
    update(_cache, { data }) {
      const newJapanFund = data?.createJapanFund;
      if (!newJapanFund) return;

      const existingJapanFundsData = client.readQuery({
        query: JapanFundsDocument,
      });

      // 新しい株式を既存のリストに追加
      const updatedJapanFunds = existingJapanFundsData
        ? [newJapanFund, ...existingJapanFundsData.japanFunds]
        : [newJapanFund];

      // キャッシュを更新
      client.writeQuery({
        query: JapanFundsDocument,
        data: { japanFunds: updatedJapanFunds },
      });
    },
  });

  const onSubmit = handleSubmit(
    async ({ code, name, getPrice, getPriceTotal }) => {
      try {
        await createJapanFund({
          variables: {
            input: {
              code,
              name,
              getPrice: parseFloat(getPrice),
              getPriceTotal: parseFloat(getPriceTotal),
            },
          },
        });
        toast.success(`${name}を追加しました`);
        reset(); // フォームのリセット
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  );
  // selectのonChangeイベントハンドラー
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // 選択された値でnameを更新
    const selectedName = JAPAN_FUND_LIST.find(
      (item) => item.code === event.target.value
    )?.name;
    if (selectedName) setName(selectedName);
  };
  return (
    <form onSubmit={onSubmit}>
      <p className="mb-2">※三菱「eMAXIS Slimシリーズ」のみ登録可能</p>
      <FormGroup>
        <label htmlFor="code">投資信託名</label>
        <select
          {...register("code")}
          className="form-control"
          onChange={handleSelectChange}
        >
          {JAPAN_FUND_LIST.filter(
            (item): item is { name: string; code: string } =>
              item !== undefined && item !== null
          )
            .sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
            .map((item: { name: string; code: string }) => (
              <option key={item.name} value={item.code}>
                {item.name}
              </option>
            ))}
        </select>
      </FormGroup>
      <FormGroup>
        <label htmlFor="name">登録名</label>
        <input
          type="text"
          className="form-control"
          {...register("name", { required: true })}
          placeholder="例: SP500"
          defaultValue={name}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="getPrice">取得価格(¥)</label>
        <input
          type="number"
          step="any"
          className="form-control"
          {...register("getPrice", { required: true })}
          placeholder="例: 15000"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="getPriceTotal">取得価格総額(¥)</label>
        <input
          type="number"
          step="any"
          className="form-control"
          {...register("getPriceTotal", { required: true })}
          placeholder="例: 200000"
        />
      </FormGroup>
      <PrimaryButton content="追加" className="mb-3 w-100" type="submit" />
    </form>
  );
};

CreateJapanFundFormComponent.displayName = "CreateJapanFundForm";
export const CreateJapanFundForm = React.memo(CreateJapanFundFormComponent);
