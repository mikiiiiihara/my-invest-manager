import React, { FC, useState } from "react";
import { CreateUsStockForm } from "./us-stock";
import { CreateJapanFundForm } from "./japan-fund";

type Props = {
  setShowModal: Function;
};

const DISPLAY_MODE = {
  usStock: "米国株",
  japanFund: "日本投資信託",
};

const contents = (displayMode: string, setShowModal: Function) => {
  switch (displayMode) {
    case DISPLAY_MODE.usStock:
      return <CreateUsStockForm setShowModal={setShowModal} />;
    default:
      return <CreateJapanFundForm setShowModal={setShowModal} />;
  }
};

const CreateFormComponent: FC<Props> = ({ setShowModal }) => {
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
      </select>
      <h3 className="mb-3">を追加</h3>
      {contents(displayMode, setShowModal)}
    </>
  );
};

CreateFormComponent.displayName = "CreateForm";
export const CreateForm = React.memo(CreateFormComponent);
