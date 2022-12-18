import { ReactElement } from "react";

interface IModal {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  children: ReactElement<any, any> | ReactElement<any, any>[];
  title?: string;
}

export default IModal;
