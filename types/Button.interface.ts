import { CSSProperties, ReactElement } from "react";

interface IButton {
  title: string | ReactElement<any, any>;
  onPress: () => void;
  style?: CSSProperties;
}

export default IButton;
