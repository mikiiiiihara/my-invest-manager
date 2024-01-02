import React, { FC } from "react";
import { CreateUsStockForm } from "./us-stock";

const DISPLAY_MODE = {
  ticker: "ticker",
  sector: "sector",
};

type Props = {
  setShowModal: Function;
};

const CreateFormComponent: FC<Props> = ({ setShowModal }) => {
  return <CreateUsStockForm setShowModal={setShowModal} />;
};

CreateFormComponent.displayName = "CreateForm";
export const CreateForm = React.memo(CreateFormComponent);
