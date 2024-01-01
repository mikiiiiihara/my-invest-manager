import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const FormGroup: React.FC<Props> = ({ children }) => {
  return <div className="form-group mb-3">{children}</div>;
};
