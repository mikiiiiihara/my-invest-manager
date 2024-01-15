import React, { FC } from "react";
import { CreateUsStockForm } from "./us-stock";

type Props = {
  setShowModal: Function;
};

const CreateFormComponent: FC<Props> = ({ setShowModal }) => {
  return <CreateUsStockForm setShowModal={setShowModal} />;
};

CreateFormComponent.displayName = "CreateForm";
export const CreateForm = React.memo(CreateFormComponent);
