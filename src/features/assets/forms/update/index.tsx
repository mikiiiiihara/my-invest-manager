import React, { FC, useState } from "react";
import { UpdateUsStockForm } from "./us-stock";
import { Asset } from "../../logic/calculate-all-assets";
import { UpdateJapanFundForm } from "./japan-fund";
import { UpdateFixedIncomeAssetForm } from "./fixed-income-asset";
import { UpdateCryptoForm } from "./crypto";

type Props = {
  assets: Asset[];
  setShowModal: Function;
};

const DISPLAY_MODE = {
  usStock: "米国株",
  japanFund: "日本投資信託",
  fixedIncomeAsset: "固定利回り資産",
  crypto: "暗号通貨",
};

const contents = (
  assets: Asset[],
  displayMode: string,
  setShowModal: Function
) => {
  switch (displayMode) {
    case DISPLAY_MODE.usStock:
      return <UpdateUsStockForm assets={assets} setShowModal={setShowModal} />;
    case DISPLAY_MODE.fixedIncomeAsset:
      return (
        <UpdateFixedIncomeAssetForm
          assets={assets}
          setShowModal={setShowModal}
        />
      );
    case DISPLAY_MODE.crypto:
      return <UpdateCryptoForm assets={assets} setShowModal={setShowModal} />;
    default:
      return (
        <UpdateJapanFundForm assets={assets} setShowModal={setShowModal} />
      );
  }
};

const UpdateFormComponent: FC<Props> = ({ assets, setShowModal }) => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.usStock);

  const handleDisplayModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayMode(event.target.value);
  };

  return (
    <>
      <select
        className="form-control"
        value={displayMode}
        onChange={handleDisplayModeChange}
      >
        <option key={DISPLAY_MODE.usStock} value={DISPLAY_MODE.usStock}>
          {DISPLAY_MODE.usStock}
        </option>
        <option key={DISPLAY_MODE.japanFund} value={DISPLAY_MODE.japanFund}>
          {DISPLAY_MODE.japanFund}
        </option>
        <option key={DISPLAY_MODE.crypto} value={DISPLAY_MODE.crypto}>
          {DISPLAY_MODE.crypto}
        </option>
        <option
          key={DISPLAY_MODE.fixedIncomeAsset}
          value={DISPLAY_MODE.fixedIncomeAsset}
        >
          {DISPLAY_MODE.fixedIncomeAsset}
        </option>
      </select>
      <h3 className="mb-3">を追加</h3>
      {contents(assets, displayMode, setShowModal)}
    </>
  );
};

UpdateFormComponent.displayName = "UpdateForm";
export const UpdateForm = React.memo(UpdateFormComponent);
