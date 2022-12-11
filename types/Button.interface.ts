import { CSSProperties, ReactElement } from "react";

interface IButton {
  onPress: () => void;
  style: CSSProperties;
  title: string | ReactElement<any, any>;
}

export default IButton;
