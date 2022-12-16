import { ReactNode } from "react";

interface IModal {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  children: ReactNode;
}

export default IModal;
