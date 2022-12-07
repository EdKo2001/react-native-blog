import { StyleSheetProperties } from "react-native";

interface IAccessibleImage {
  src: string;
  height?: number;
  width?: number | string;
  alt?: string;
  style?: StyleSheetProperties | {};
}

export default IAccessibleImage;
